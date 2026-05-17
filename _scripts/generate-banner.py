from PIL import Image, ImageDraw, ImageFont
import sys

def generate_banner(text, font_size=100, cell_w=6, cell_h=10):
    font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", font_size)
    bbox = font.getbbox(text)
    w, h = bbox[2] - bbox[0], bbox[3] - bbox[1]
    img = Image.new("L", (w + 20, h + 20), 0)
    draw = ImageDraw.Draw(img)
    draw.text((10, 10), text, font=font, fill=255)

    cols = (w + 20) // cell_w
    rows = (h + 20) // cell_h

    grid = []
    for r in range(rows):
        row = []
        for c in range(cols):
            x = c * cell_w + cell_w // 2
            y = r * cell_h + cell_h // 2
            if x < img.width and y < img.height:
                pixel = img.getpixel((x, y))
                row.append(pixel > 128)
            else:
                row.append(False)
        grid.append(row)

    return grid

def grid_to_banner(grid):
    rows, cols = len(grid), len(grid[0])
    lines = []

    for r in range(rows):
        row_chars = []
        for c in range(cols):
            filled = grid[r][c]
            if not filled:
                row_chars.append(" ")
                continue

            up = r > 0 and grid[r - 1][c]
            dn = r < rows - 1 and grid[r + 1][c]
            lt = c > 0 and grid[r][c - 1]
            rt = c < cols - 1 and grid[r][c + 1]

            up_lt = r > 0 and c > 0 and grid[r - 1][c - 1]
            up_rt = r > 0 and c < cols - 1 and grid[r - 1][c + 1]
            dn_lt = r < rows - 1 and c > 0 and grid[r + 1][c - 1]
            dn_rt = r < rows - 1 and c < cols - 1 and grid[r + 1][c + 1]

            if up and dn and lt and rt:
                row_chars.append("\u2588")
            elif up and dn and rt and not lt:
                row_chars.append("\u2551")
            elif up and lt and rt and not dn:
                row_chars.append("\u2566")
            elif dn and lt and rt and not up:
                row_chars.append("\u2569")
            elif up and lt and dn and not rt:
                row_chars.append("\u2563")
            elif up and rt and dn and not lt:
                row_chars.append("\u2560")
            elif lt and rt and not up and not dn:
                row_chars.append("\u2550")
            elif up and dn and not lt and not rt:
                row_chars.append("\u2502")
            elif up and lt and not rt and not dn:
                row_chars.append("\u2557")
            elif up and rt and not lt and not dn:
                row_chars.append("\u2554")
            elif dn and lt and not rt and not up:
                row_chars.append("\u255d")
            elif dn and rt and not lt and not up:
                row_chars.append("\u255a")
            elif up and rt and dn and not lt:
                row_chars.append("\u2560")
            elif up and lt and dn and not rt:
                row_chars.append("\u2563")
            elif lt and up_rt and not up and not lt and not rt:
                row_chars.append("\u2554")
            elif lt and dn_rt and not dn and not lt and not rt:
                row_chars.append("\u255a")
            else:
                row_chars.append("\u2588")

        line = "".join(row_chars).rstrip()
        if line:
            lines.append(line)

    return "\n".join(lines)

if __name__ == "__main__":
    for text in sys.argv[1:]:
        grid = generate_banner(text, font_size=100, cell_w=6, cell_h=10)
        print(grid_to_banner(grid))
        print()
