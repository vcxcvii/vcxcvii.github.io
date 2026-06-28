(function() {
  var mcp = new WebMCP({ color: 'transparent', size: '32px' });

  // Replace plain square with site favicon
  requestAnimationFrame(function () {
    var trigger = document.querySelector('.webmcp-trigger');
    if (!trigger) return;
    trigger.style.backgroundColor = 'transparent';
    trigger.style.boxShadow = 'none';
    var img = document.createElement('img');
    img.src = '/assets/favicon.svg';
    img.width = 32;
    img.height = 32;
    img.alt = 'Connect via MCP';
    img.style.display = 'block';
    img.style.borderRadius = '4px';
    img.style.boxShadow = '0 2px 8px rgba(0,0,0,0.18)';
    trigger.appendChild(img);
  });

  mcp.registerTool(
    'get_site_info',
    'Get information about Varun Choraria — his background, topics he writes about, and how to reach him.',
    { type: 'object', properties: {} },
    function() {
      return {
        content: [{
          type: 'text',
          text: JSON.stringify({
            name: 'Varun Choraria',
            role: 'Senior Manager, Marketing at GTM Buddy',
            bio: 'B2B SaaS marketing operator with over a decade of experience. Writes about go-to-market strategy, sales enablement, content, and the evolving role of AI in B2B revenue teams.',
            topics: ['B2B SaaS', 'GTM strategy', 'product marketing', 'sales enablement', 'AI in sales', 'management', 'career'],
            site: 'https://www.varunchoraria.com',
            writing: 'https://www.varunchoraria.com/blog/',
            cal: 'https://cal.com/varun-choraria/30min',
            book: 'Miracle-preneuring: Why anyone can and should be an entrepreneur (2016)'
          }, null, 2)
        }]
      };
    }
  );

  mcp.registerTool(
    'list_posts',
    'List all notes and writing on varunchoraria.com with titles, dates, tags, and slugs.',
    { type: 'object', properties: {} },
    async function() {
      var res = await fetch('/api/posts.json');
      var data = await res.json();
      var summary = data.posts.map(function(p) {
        return { title: p.title, slug: p.slug, date: p.date, tags: p.tags, url: p.url };
      });
      return {
        content: [{ type: 'text', text: JSON.stringify(summary, null, 2) }]
      };
    }
  );

  mcp.registerTool(
    'get_post',
    'Get the full text of a specific note by its slug.',
    {
      type: 'object',
      properties: {
        slug: { type: 'string', description: 'Post slug (e.g. "killed-by-google"). Use list_posts to find slugs.' }
      },
      required: ['slug']
    },
    async function(args) {
      var res = await fetch('/api/posts.json');
      var data = await res.json();
      var post = data.posts.find(function(p) { return p.slug === args.slug; });
      if (!post) {
        return { content: [{ type: 'text', text: 'Post not found. Use list_posts to see available slugs.' }] };
      }
      return {
        content: [{
          type: 'text',
          text: JSON.stringify({ title: post.title, date: post.date, tags: post.tags, url: post.url, content: post.content }, null, 2)
        }]
      };
    }
  );

  mcp.registerTool(
    'search_posts',
    'Search all notes on varunchoraria.com by keyword. Returns matching posts with excerpts.',
    {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Search term or phrase' }
      },
      required: ['query']
    },
    async function(args) {
      var res = await fetch('/api/posts.json');
      var data = await res.json();
      var q = args.query.toLowerCase();
      var matches = data.posts.filter(function(p) {
        return p.title.toLowerCase().includes(q) ||
               p.content.toLowerCase().includes(q) ||
               (p.tags && p.tags.some(function(t) { return t.toLowerCase().includes(q); }));
      }).map(function(p) {
        return { title: p.title, slug: p.slug, date: p.date, tags: p.tags, url: p.url, excerpt: p.excerpt };
      });
      return {
        content: [{
          type: 'text',
          text: matches.length ? JSON.stringify(matches, null, 2) : 'No posts found matching "' + args.query + '".'
        }]
      };
    }
  );
})();
