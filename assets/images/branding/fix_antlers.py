"""
Generate 3 whitetail antler variations for the township logo.
Uses filled polygons for visible antler shapes on a 200px image.
Does NOT overwrite the original file.
"""
from PIL import Image, ImageDraw

SRC = r"C:\sites\colfax-township-website\assets\images\branding\township-logo.png"
OUT = r"C:\sites\colfax-township-website\assets\images\branding"
BLACK = (0, 0, 0, 255)
CLEAR = (0, 0, 0, 0)


def erase_antlers(img):
    """Remove ALL existing elk-style antler tines above the head."""
    px = img.load()
    # The deer head is around x=28-45, y=34-45. Elk antler tines spread
    # left and upward from x=14-50, y=12-37.
    # Aggressively erase everything above the head/neck line.
    for y in range(10, 38):
        for x in range(10, 55):
            if px[x, y][3] > 128 and px[x, y][0] < 50:
                px[x, y] = CLEAR

    # Also erase any fragments at the neck transition (y=38, x<27)
    for y in range(38, 40):
        for x in range(10, 27):
            if px[x, y][3] > 128 and px[x, y][0] < 50:
                px[x, y] = CLEAR
    return img


def draw_option1(img):
    """Classic 8-point whitetail — filled polygon antler shapes."""
    draw = ImageDraw.Draw(img)

    # LEFT antler (profile side — fully visible, sweeping up-left)
    # Main beam as a thick filled shape curving from head up and forward
    # Each tine is a filled triangle/polygon for visibility

    # Main beam spine (thick)
    draw.line([(38, 36), (34, 30), (30, 25), (27, 20)], fill=BLACK, width=5)

    # Brow tine (near base, angled forward)
    draw.polygon([(36, 32), (32, 25), (30, 24), (34, 30)], fill=BLACK)

    # G2 tine (mid beam, pointing up)
    draw.polygon([(32, 28), (28, 18), (26, 17), (30, 26)], fill=BLACK)

    # G3 tine (upper, pointing up)
    draw.polygon([(29, 23), (25, 14), (23, 13), (27, 21)], fill=BLACK)

    # Beam tip curves up
    draw.polygon([(27, 20), (23, 12), (21, 11), (25, 18)], fill=BLACK)

    # RIGHT antler (far side — shorter, peeking behind head)
    draw.line([(42, 36), (44, 30), (46, 24), (47, 19)], fill=BLACK, width=4)
    # Tine peeks
    draw.polygon([(44, 30), (47, 22), (45, 21), (43, 28)], fill=BLACK)
    draw.polygon([(46, 25), (49, 16), (47, 15), (44, 23)], fill=BLACK)

    return img


def draw_option2(img):
    """Trophy 10-point whitetail — bigger, wider spread, filled shapes."""
    draw = ImageDraw.Draw(img)

    # LEFT antler — wide sweeping beam with 5 tines
    draw.line([(38, 36), (33, 29), (28, 22), (23, 16), (19, 12)], fill=BLACK, width=5)

    # Brow tine
    draw.polygon([(35, 31), (31, 23), (29, 22), (33, 29)], fill=BLACK)

    # G2
    draw.polygon([(31, 26), (27, 17), (25, 16), (29, 24)], fill=BLACK)

    # G3
    draw.polygon([(27, 21), (23, 12), (21, 11), (25, 19)], fill=BLACK)

    # G4
    draw.polygon([(24, 17), (20, 9), (18, 8), (22, 15)], fill=BLACK)

    # Beam tip
    draw.polygon([(20, 13), (16, 5), (14, 5), (18, 11)], fill=BLACK)

    # RIGHT antler — wider peek for trophy size
    draw.line([(42, 36), (45, 28), (48, 21), (50, 15)], fill=BLACK, width=4)
    draw.polygon([(45, 29), (48, 20), (46, 19), (44, 27)], fill=BLACK)
    draw.polygon([(47, 23), (50, 14), (48, 13), (46, 21)], fill=BLACK)
    draw.polygon([(49, 17), (52, 9), (50, 8), (48, 15)], fill=BLACK)

    return img


def draw_option3(img):
    """Young 6-point whitetail — compact but still clearly visible."""
    draw = ImageDraw.Draw(img)

    # LEFT antler — shorter beam, 3 solid tines
    draw.line([(38, 36), (34, 29), (31, 23)], fill=BLACK, width=5)

    # Brow tine
    draw.polygon([(36, 32), (32, 24), (30, 23), (34, 30)], fill=BLACK)

    # G2 tine
    draw.polygon([(33, 27), (29, 18), (27, 17), (31, 25)], fill=BLACK)

    # Beam tip / G3
    draw.polygon([(31, 23), (27, 14), (25, 13), (29, 21)], fill=BLACK)

    # RIGHT antler — small peek
    draw.line([(42, 36), (44, 30), (46, 24)], fill=BLACK, width=4)
    draw.polygon([(44, 30), (47, 22), (45, 21), (43, 28)], fill=BLACK)

    return img


# Generate all 3 options
options = [
    ("township-logo-whitetail-8pt.png", draw_option1, "Classic 8-point"),
    ("township-logo-whitetail-10pt.png", draw_option2, "Trophy 10-point"),
    ("township-logo-whitetail-6pt.png", draw_option3, "Young 6-point"),
]

for filename, draw_fn, label in options:
    img = Image.open(SRC).copy()
    img = erase_antlers(img)
    img = draw_fn(img)
    path = f"{OUT}\\{filename}"
    img.save(path)
    print(f"[{label}] Saved: {path}")
