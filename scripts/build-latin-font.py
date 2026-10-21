from pathlib import Path
from tempfile import TemporaryDirectory

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

root = Path(__file__).resolve().parent.parent
source = root / "app/fonts/GoogleSansFlex.ttf"
output = root / "app/fonts/GoogleSansFlex-latin.woff2"

font = instantiateVariableFont(
    TTFont(source), {"wdth": 100, "GRAD": 0, "ROND": 0, "slnt": 0}, inplace=True
)
with TemporaryDirectory() as directory:
    intermediate = Path(directory) / "instanced.ttf"
    font.save(intermediate)
    font.close()
    font = TTFont(intermediate)

    options = subset.Options()
    options.layout_features = ["calt", "ccmp", "liga", "locl", "kern", "mark", "mkmk"]
    subsetter = subset.Subsetter(options=options)
    subsetter.populate(unicodes=(
        list(range(0x20, 0x100))
        + [0x131, 0x152, 0x153, 0x2BB, 0x2BC, 0x2C6, 0x2DA, 0x2DC, 0x304, 0x308, 0x329]
        + list(range(0x2000, 0x2070))
        + [0x2074, 0x20AC, 0x2122, 0x2212, 0x2215, 0x2191, 0x2193, 0xFEFF, 0xFFFD]
    ))
    subsetter.subset(font)
    font.flavor = "woff2"
    font.save(output)
    font.close()

print(f"{output.name}: {output.stat().st_size:,} bytes")
