from PIL import Image, ImageDraw, ImageFont
import sys

def text_to_3d_block(text, font_path="/System/Library/Fonts/Helvetica-Bold.ttf",
                     font_size=140, char_w=9, char_h=14):
    font = ImageFont.truetype(font_path, font_size)
    bbox = font.getbbox(text)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    pad = 30
    img = Image.new("L", (tw + pad * 2, th + pad * 2), 255)
    draw = ImageDraw.Draw(img)
    draw.text((pad - bbox[0], pad - bbox[1]), text, font=font, fill=0)

    cols = img.width // char_w
    rows = img.height // char_h

    grid = []
    for r in range(rows):
        row = []
        for c in range(cols):
            x = c * char_w + char_w // 2
            y = r * char_h + char_h // 2
            if x < img.width and y < img.height:
                filled = img.getpixel((x, y)) < 200
            else:
                filled = False
            row.append(filled)
        grid.append(row)

    result = grid_to_3d(grid)
    trimmed = trim_banner(result)
    return trimmed

def grid_to_3d(grid):
    rows, cols = len(grid), len(grid[0])
    lines = []
    for r in range(rows):
        line_chars = []
        for c in range(cols):
            filled = grid[r][c]
            if not filled:
                line_chars.append(" ")
                continue

            up = r > 0 and grid[r-1][c]
            dn = r < rows - 1 and grid[r+1][c]
            lt = c > 0 and grid[r][c-1]
            rt = c < cols - 1 and grid[r][c+1]

            nbs = sum([up, dn, lt, rt])

            if nbs == 0:
                line_chars.append("\u2588")
            elif up and dn and lt and rt:
                line_chars.append("\u2588")
            elif up and dn and lt and not rt:
                line_chars.append("\u2551")
            elif up and dn and not lt and rt:
                line_chars.append("\u2551")
            elif not up and dn and lt and rt:
                line_chars.append("\u2550")
            elif up and not dn and lt and rt:
                line_chars.append("\u2550")
            elif not up and not dn and lt and rt:
                line_chars.append("\u2550")
            elif up and dn and not lt and not rt:
                line_chars.append("\u2551")
            elif up and not dn and not lt and rt:
                line_chars.append("\u255D")
            elif up and not dn and lt and not rt:
                line_chars.append("\u255A")
            elif not up and dn and not lt and rt:
                line_chars.append("\u2557")
            elif not up and dn and lt and not rt:
                line_chars.append("\u2554")
            elif up and not dn and not lt and not rt:
                line_chars.append("\u255D")
            elif not up and dn and not lt and not rt:
                line_chars.append("\u2557")
            elif not up and not dn and lt and not rt:
                line_chars.append("\u2550")
            elif not up and not dn and not lt and rt:
                line_chars.append("\u2550")
            elif up and not dn and lt and rt:
                line_chars.append("\u2569")
            elif not up and dn and lt and rt:
                line_chars.append("\u2566")
            else:
                line_chars.append("\u2588")

        line = "".join(line_chars).rstrip()
        lines.append(line)
    return lines

def trim_banner(lines):
    while lines and all(c == " " for c in lines[0]):
        lines = lines[1:]
    while lines and all(c == " " for c in lines[-1]):
        lines = lines[:-1]

    if lines:
        min_col = min(len(line) - len(line.lstrip()) for line in lines if line.strip())
        lines = [line[min_col:] if line.strip() else line for line in lines]

    return "\n".join(lines)

if __name__ == "__main__":
    for text in sys.argv[1:]:
        print(text_to_3d_block(text))
        print()
