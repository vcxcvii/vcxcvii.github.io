from PIL import Image, ImageDraw, ImageFont
import sys

KERN = 0

FONT5X7 = {
    'A': ["  #  ", " # # ", "#   #", "#####", "#   #", "#   #", "#   #"],
    'B': ["#### ", "#   #", "#### ", "#   #", "#   #", "#   #", "#### "],
    'C': [" ### ", "#   #", "#    ", "#    ", "#    ", "#   #", " ### "],
    'D': ["#### ", "#   #", "#   #", "#   #", "#   #", "#   #", "#### "],
    'E': ["#####", "#    ", "#####", "#    ", "#    ", "#    ", "#####"],
    'F': ["#####", "#    ", "#####", "#    ", "#    ", "#    ", "#    "],
    'G': [" ### ", "#   #", "#    ", "#  ##", "#   #", "#   #", " ### "],
    'H': ["#   #", "#   #", "#####", "#   #", "#   #", "#   #", "#   #"],
    'I': ["#####", "  #  ", "  #  ", "  #  ", "  #  ", "  #  ", "#####"],
    'J': ["  ###", "   # ", "   # ", "   # ", "   # ", "#  # ", " ##  "],
    'K': ["#   #", "#  # ", "###  ", "#  # ", "#  # ", "#   #", "#   #"],
    'L': ["#    ", "#    ", "#    ", "#    ", "#    ", "#    ", "#####"],
    'M': ["#   #", "## ##", "# # #", "#   #", "#   #", "#   #", "#   #"],
    'N': ["#   #", "##  #", "# # #", "#  ##", "#   #", "#   #", "#   #"],
    'O': [" ### ", "#   #", "#   #", "#   #", "#   #", "#   #", " ### "],
    'P': ["#### ", "#   #", "#   #", "#### ", "#    ", "#    ", "#    "],
    'Q': [" ### ", "#   #", "#   #", "#   #", "# # #", "#  # ", " ## #"],
    'R': ["#### ", "#   #", "#   #", "#### ", "#  # ", "#   #", "#   #"],
    'S': [" ####", "#    ", "#    ", " ### ", "    #", "    #", "#### "],
    'T': ["#####", "  #  ", "  #  ", "  #  ", "  #  ", "  #  ", "  #  "],
    'U': ["#   #", "#   #", "#   #", "#   #", "#   #", "#   #", " ### "],
    'V': ["#   #", "#   #", "#   #", "#   #", "#   #", " # # ", "  #  "],
    'W': ["#   #", "#   #", "#   #", "# # #", "# # #", "# # #", " # # "],
    'X': ["#   #", "#   #", " # # ", "  #  ", " # # ", "#   #", "#   #"],
    'Y': ["#   #", "#   #", " # # ", "  #  ", "  #  ", "  #  ", "  #  "],
    'Z': ["#####", "    #", "   # ", "  #  ", " #   ", "#    ", "#####"],
    '-': ["     ", "     ", "     ", "#####", "     ", "     ", "     "],
    '.': ["     ", "     ", "     ", "     ", "     ", "  #  ", "  #  "],
    ' ': ["     ", "     ", "     ", "     ", "     ", "     ", "     "],
    '_': ["     ", "     ", "     ", "     ", "     ", "     ", "#####"],
}

def get_letter(ch):
    return FONT5X7.get(ch.upper(), FONT5X7[' '])

def render_text(text):
    if not text:
        return []
    letters = [get_letter(c) for c in text]
    height = 7
    grid = []
    for row_idx in range(height):
        row_pixels = []
        for li, letter in enumerate(letters):
            row_pixels.append(letter[row_idx])
            if li < len(letters) - 1:
                row_pixels.append("     " if KERN else "")
        combined = "".join(row_pixels)
        grid.append(list(combined))
    max_w = max(len(r) for r in grid)
    for r in grid:
        while len(r) < max_w:
            r.append(' ')
        while len(r) > max_w:
            r.pop()
    return grid

def grid_to_3d_block(grid):
    rows, cols = len(grid), len(grid[0])
    result = []
    for r in range(rows):
        line = []
        for c in range(cols):
            filled = grid[r][c] == '#'
            up = r > 0 and grid[r-1][c] == '#'
            dn = r < rows - 1 and grid[r+1][c] == '#'
            lt = c > 0 and grid[r][c-1] == '#'
            rt = c < cols - 1 and grid[r][c+1] == '#'

            if not filled:
                line.append(' ')
                continue

            if up and dn and lt and rt:
                # Interior
                line.append('\u2588')
            elif up and dn and lt and not rt:
                # filled on left, right is empty -> right edge
                line.append('\u2551')
            elif up and dn and not lt and rt:
                # filled on right, left is empty -> left edge
                line.append('\u2551')
            elif not up and dn and lt and rt:
                # filled below, above is empty -> top edge
                line.append('\u2550')
            elif up and not dn and lt and rt:
                # filled above, below is empty -> bottom edge
                line.append('\u2550')

            elif not up and not rt and dn:
                # Top-right inner corner: above and right are empty
                line.append('\u2557')
            elif not up and not lt and dn:
                # Top-left inner corner: above and left are empty
                line.append('\u2554')
            elif not dn and not rt and up:
                # Bottom-right inner corner
                line.append('\u255D')
            elif not dn and not lt and up:
                # Bottom-left inner corner
                line.append('\u255A')

            elif not up and rt and not dn and not lt:
                # Top edge with left being a top-left corner
                line.append('\u2557')
            elif up and not dn and lt and not rt:
                line.append('\u255D')
            elif not up and lt and not dn and not rt:
                line.append('\u2554')
            elif up and not dn and rt and not lt:
                line.append('\u255A')
            elif up and dn and not lt and not rt:
                # vertical single
                line.append('\u2551')
            elif not up and not dn and lt and rt:
                # horizontal single  
                line.append('\u2550')
            elif not up and not dn and not lt and rt:
                line.append('\u2550')
            elif not up and not dn and lt and not rt:
                line.append('\u2550')
            else:
                line.append('\u2588')
        result.append("".join(line).rstrip())
    return "\n".join(result)


if __name__ == "__main__":
    for text in sys.argv[1:]:
        grid = render_text(text)
        print(grid_to_3d_block(grid))
        print()
