/**
 * Kindergarten Photo Studio — Dijital Teslimat Sistemi
 * Veli & Admin Paneli
 */
(function () {
    'use strict';

    const PHOTO_BASE_URL = 'https://pub-5675e08d774a4bdf8fbe29c4d965bbca.r2.dev/';
    const FORMSPREE_URL = 'https://formspree.io/f/xvzvlqjg';

    // ── SHA-256 Hash Utility (BUG-02: PIN Security) ──
    async function sha256(str) {
        const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
        return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
    }
    // Compare input against plain or hashed PIN
    async function pinMatch(input, stored) {
        if (input === stored) return true; // plain text fallback
        try { return (await sha256(input)) === stored; } catch(e) { return false; }
    }

    // ── Inline fallback config (works with file:// protocol) ──
    const INLINE_CONFIG = {
        "schools": [
                {
                        "slug": "nicekindergarten",
                        "name": "Nicekindergarten",
                        "veliPin": "nice2026",
                        "adminPin": "admin2026",
                        "basePath": "nicekindergarten/",
                        "photos": [
                                {
                                        "id": "IMG_0001",
                                        "thumb": "thumbs/DSC00814.jpg",
                                        "original": "originals/DSC00814.jpg"
                                },
                                {
                                        "id": "IMG_0002",
                                        "thumb": "thumbs/DSC00824.jpg",
                                        "original": "originals/DSC00824.jpg"
                                },
                                {
                                        "id": "IMG_0003",
                                        "thumb": "thumbs/DSC00832.jpg",
                                        "original": "originals/DSC00832.jpg"
                                },
                                {
                                        "id": "IMG_0004",
                                        "thumb": "thumbs/DSC00838.jpg",
                                        "original": "originals/DSC00838.jpg"
                                },
                                {
                                        "id": "IMG_0005",
                                        "thumb": "thumbs/DSC00843.jpg",
                                        "original": "originals/DSC00843.jpg"
                                },
                                {
                                        "id": "IMG_0006",
                                        "thumb": "thumbs/DSC00848.jpg",
                                        "original": "originals/DSC00848.jpg"
                                },
                                {
                                        "id": "IMG_0007",
                                        "thumb": "thumbs/DSC00853.jpg",
                                        "original": "originals/DSC00853.jpg"
                                },
                                {
                                        "id": "IMG_0008",
                                        "thumb": "thumbs/DSC00855.jpg",
                                        "original": "originals/DSC00855.jpg"
                                },
                                {
                                        "id": "IMG_0009",
                                        "thumb": "thumbs/DSC00864.jpg",
                                        "original": "originals/DSC00864.jpg"
                                },
                                {
                                        "id": "IMG_0010",
                                        "thumb": "thumbs/DSC00869.jpg",
                                        "original": "originals/DSC00869.jpg"
                                },
                                {
                                        "id": "IMG_0011",
                                        "thumb": "thumbs/DSC00871.jpg",
                                        "original": "originals/DSC00871.jpg"
                                },
                                {
                                        "id": "IMG_0012",
                                        "thumb": "thumbs/DSC00876.jpg",
                                        "original": "originals/DSC00876.jpg"
                                },
                                {
                                        "id": "IMG_0013",
                                        "thumb": "thumbs/DSC00890.jpg",
                                        "original": "originals/DSC00890.jpg"
                                },
                                {
                                        "id": "IMG_0014",
                                        "thumb": "thumbs/DSC00893.jpg",
                                        "original": "originals/DSC00893.jpg"
                                },
                                {
                                        "id": "IMG_0015",
                                        "thumb": "thumbs/DSC00900.jpg",
                                        "original": "originals/DSC00900.jpg"
                                },
                                {
                                        "id": "IMG_0016",
                                        "thumb": "thumbs/DSC00902.jpg",
                                        "original": "originals/DSC00902.jpg"
                                },
                                {
                                        "id": "IMG_0017",
                                        "thumb": "thumbs/DSC00908.jpg",
                                        "original": "originals/DSC00908.jpg"
                                },
                                {
                                        "id": "IMG_0018",
                                        "thumb": "thumbs/DSC00910.jpg",
                                        "original": "originals/DSC00910.jpg"
                                },
                                {
                                        "id": "IMG_0019",
                                        "thumb": "thumbs/DSC00919.jpg",
                                        "original": "originals/DSC00919.jpg"
                                },
                                {
                                        "id": "IMG_0020",
                                        "thumb": "thumbs/DSC00928.jpg",
                                        "original": "originals/DSC00928.jpg"
                                },
                                {
                                        "id": "IMG_0021",
                                        "thumb": "thumbs/DSC00936.jpg",
                                        "original": "originals/DSC00936.jpg"
                                },
                                {
                                        "id": "IMG_0022",
                                        "thumb": "thumbs/DSC00944.jpg",
                                        "original": "originals/DSC00944.jpg"
                                },
                                {
                                        "id": "IMG_0023",
                                        "thumb": "thumbs/DSC00951.jpg",
                                        "original": "originals/DSC00951.jpg"
                                },
                                {
                                        "id": "IMG_0024",
                                        "thumb": "thumbs/DSC00954.jpg",
                                        "original": "originals/DSC00954.jpg"
                                },
                                {
                                        "id": "IMG_0025",
                                        "thumb": "thumbs/DSC00956.jpg",
                                        "original": "originals/DSC00956.jpg"
                                },
                                {
                                        "id": "IMG_0026",
                                        "thumb": "thumbs/DSC00958.jpg",
                                        "original": "originals/DSC00958.jpg"
                                },
                                {
                                        "id": "IMG_0027",
                                        "thumb": "thumbs/DSC00960.jpg",
                                        "original": "originals/DSC00960.jpg"
                                },
                                {
                                        "id": "IMG_0028",
                                        "thumb": "thumbs/DSC00970.jpg",
                                        "original": "originals/DSC00970.jpg"
                                },
                                {
                                        "id": "IMG_0029",
                                        "thumb": "thumbs/DSC00975.jpg",
                                        "original": "originals/DSC00975.jpg"
                                },
                                {
                                        "id": "IMG_0030",
                                        "thumb": "thumbs/DSC00979.jpg",
                                        "original": "originals/DSC00979.jpg"
                                },
                                {
                                        "id": "IMG_0031",
                                        "thumb": "thumbs/DSC00981.jpg",
                                        "original": "originals/DSC00981.jpg"
                                },
                                {
                                        "id": "IMG_0032",
                                        "thumb": "thumbs/DSC00985.jpg",
                                        "original": "originals/DSC00985.jpg"
                                },
                                {
                                        "id": "IMG_0033",
                                        "thumb": "thumbs/DSC00987.jpg",
                                        "original": "originals/DSC00987.jpg"
                                },
                                {
                                        "id": "IMG_0034",
                                        "thumb": "thumbs/DSC00989.jpg",
                                        "original": "originals/DSC00989.jpg"
                                },
                                {
                                        "id": "IMG_0035",
                                        "thumb": "thumbs/DSC00991.jpg",
                                        "original": "originals/DSC00991.jpg"
                                },
                                {
                                        "id": "IMG_0036",
                                        "thumb": "thumbs/DSC00992.jpg",
                                        "original": "originals/DSC00992.jpg"
                                },
                                {
                                        "id": "IMG_0037",
                                        "thumb": "thumbs/DSC00999.jpg",
                                        "original": "originals/DSC00999.jpg"
                                },
                                {
                                        "id": "IMG_0038",
                                        "thumb": "thumbs/DSC01000.jpg",
                                        "original": "originals/DSC01000.jpg"
                                },
                                {
                                        "id": "IMG_0039",
                                        "thumb": "thumbs/DSC01004.jpg",
                                        "original": "originals/DSC01004.jpg"
                                },
                                {
                                        "id": "IMG_0040",
                                        "thumb": "thumbs/DSC01009.jpg",
                                        "original": "originals/DSC01009.jpg"
                                },
                                {
                                        "id": "IMG_0041",
                                        "thumb": "thumbs/DSC01010.jpg",
                                        "original": "originals/DSC01010.jpg"
                                },
                                {
                                        "id": "IMG_0042",
                                        "thumb": "thumbs/DSC01015.jpg",
                                        "original": "originals/DSC01015.jpg"
                                },
                                {
                                        "id": "IMG_0043",
                                        "thumb": "thumbs/DSC01021.jpg",
                                        "original": "originals/DSC01021.jpg"
                                },
                                {
                                        "id": "IMG_0044",
                                        "thumb": "thumbs/DSC01029.jpg",
                                        "original": "originals/DSC01029.jpg"
                                },
                                {
                                        "id": "IMG_0045",
                                        "thumb": "thumbs/DSC01032.jpg",
                                        "original": "originals/DSC01032.jpg"
                                },
                                {
                                        "id": "IMG_0046",
                                        "thumb": "thumbs/DSC01036.jpg",
                                        "original": "originals/DSC01036.jpg"
                                },
                                {
                                        "id": "IMG_0047",
                                        "thumb": "thumbs/DSC01041.jpg",
                                        "original": "originals/DSC01041.jpg"
                                },
                                {
                                        "id": "IMG_0048",
                                        "thumb": "thumbs/DSC01045.jpg",
                                        "original": "originals/DSC01045.jpg"
                                },
                                {
                                        "id": "IMG_0049",
                                        "thumb": "thumbs/DSC01052.jpg",
                                        "original": "originals/DSC01052.jpg"
                                },
                                {
                                        "id": "IMG_0050",
                                        "thumb": "thumbs/DSC01058.jpg",
                                        "original": "originals/DSC01058.jpg"
                                },
                                {
                                        "id": "IMG_0051",
                                        "thumb": "thumbs/DSC01065.jpg",
                                        "original": "originals/DSC01065.jpg"
                                },
                                {
                                        "id": "IMG_0052",
                                        "thumb": "thumbs/DSC01067.jpg",
                                        "original": "originals/DSC01067.jpg"
                                },
                                {
                                        "id": "IMG_0053",
                                        "thumb": "thumbs/DSC01068.jpg",
                                        "original": "originals/DSC01068.jpg"
                                },
                                {
                                        "id": "IMG_0054",
                                        "thumb": "thumbs/DSC01069.jpg",
                                        "original": "originals/DSC01069.jpg"
                                },
                                {
                                        "id": "IMG_0055",
                                        "thumb": "thumbs/DSC01076.jpg",
                                        "original": "originals/DSC01076.jpg"
                                },
                                {
                                        "id": "IMG_0056",
                                        "thumb": "thumbs/DSC01080.jpg",
                                        "original": "originals/DSC01080.jpg"
                                },
                                {
                                        "id": "IMG_0057",
                                        "thumb": "thumbs/DSC01084.jpg",
                                        "original": "originals/DSC01084.jpg"
                                },
                                {
                                        "id": "IMG_0058",
                                        "thumb": "thumbs/DSC01091.jpg",
                                        "original": "originals/DSC01091.jpg"
                                },
                                {
                                        "id": "IMG_0059",
                                        "thumb": "thumbs/DSC01097.jpg",
                                        "original": "originals/DSC01097.jpg"
                                },
                                {
                                        "id": "IMG_0060",
                                        "thumb": "thumbs/DSC01098.jpg",
                                        "original": "originals/DSC01098.jpg"
                                },
                                {
                                        "id": "IMG_0061",
                                        "thumb": "thumbs/DSC01104.jpg",
                                        "original": "originals/DSC01104.jpg"
                                },
                                {
                                        "id": "IMG_0062",
                                        "thumb": "thumbs/DSC01107.jpg",
                                        "original": "originals/DSC01107.jpg"
                                },
                                {
                                        "id": "IMG_0063",
                                        "thumb": "thumbs/DSC01111.jpg",
                                        "original": "originals/DSC01111.jpg"
                                },
                                {
                                        "id": "IMG_0064",
                                        "thumb": "thumbs/DSC01123.jpg",
                                        "original": "originals/DSC01123.jpg"
                                },
                                {
                                        "id": "IMG_0065",
                                        "thumb": "thumbs/DSC01128.jpg",
                                        "original": "originals/DSC01128.jpg"
                                },
                                {
                                        "id": "IMG_0066",
                                        "thumb": "thumbs/DSC01130.jpg",
                                        "original": "originals/DSC01130.jpg"
                                },
                                {
                                        "id": "IMG_0067",
                                        "thumb": "thumbs/DSC01131.jpg",
                                        "original": "originals/DSC01131.jpg"
                                },
                                {
                                        "id": "IMG_0068",
                                        "thumb": "thumbs/DSC01138.jpg",
                                        "original": "originals/DSC01138.jpg"
                                },
                                {
                                        "id": "IMG_0069",
                                        "thumb": "thumbs/DSC01140.jpg",
                                        "original": "originals/DSC01140.jpg"
                                },
                                {
                                        "id": "IMG_0070",
                                        "thumb": "thumbs/DSC01143.jpg",
                                        "original": "originals/DSC01143.jpg"
                                },
                                {
                                        "id": "IMG_0071",
                                        "thumb": "thumbs/DSC01146.jpg",
                                        "original": "originals/DSC01146.jpg"
                                },
                                {
                                        "id": "IMG_0072",
                                        "thumb": "thumbs/DSC01154.jpg",
                                        "original": "originals/DSC01154.jpg"
                                },
                                {
                                        "id": "IMG_0073",
                                        "thumb": "thumbs/DSC01161.jpg",
                                        "original": "originals/DSC01161.jpg"
                                },
                                {
                                        "id": "IMG_0074",
                                        "thumb": "thumbs/DSC01170.jpg",
                                        "original": "originals/DSC01170.jpg"
                                },
                                {
                                        "id": "IMG_0075",
                                        "thumb": "thumbs/DSC01174.jpg",
                                        "original": "originals/DSC01174.jpg"
                                },
                                {
                                        "id": "IMG_0076",
                                        "thumb": "thumbs/DSC01177.jpg",
                                        "original": "originals/DSC01177.jpg"
                                },
                                {
                                        "id": "IMG_0077",
                                        "thumb": "thumbs/DSC01182.jpg",
                                        "original": "originals/DSC01182.jpg"
                                },
                                {
                                        "id": "IMG_0078",
                                        "thumb": "thumbs/DSC01195.jpg",
                                        "original": "originals/DSC01195.jpg"
                                },
                                {
                                        "id": "IMG_0079",
                                        "thumb": "thumbs/DSC01201.jpg",
                                        "original": "originals/DSC01201.jpg"
                                },
                                {
                                        "id": "IMG_0080",
                                        "thumb": "thumbs/DSC01207.jpg",
                                        "original": "originals/DSC01207.jpg"
                                },
                                {
                                        "id": "IMG_0081",
                                        "thumb": "thumbs/DSC01220.jpg",
                                        "original": "originals/DSC01220.jpg"
                                },
                                {
                                        "id": "IMG_0082",
                                        "thumb": "thumbs/DSC01223.jpg",
                                        "original": "originals/DSC01223.jpg"
                                },
                                {
                                        "id": "IMG_0083",
                                        "thumb": "thumbs/DSC01232.jpg",
                                        "original": "originals/DSC01232.jpg"
                                },
                                {
                                        "id": "IMG_0084",
                                        "thumb": "thumbs/DSC01237.jpg",
                                        "original": "originals/DSC01237.jpg"
                                },
                                {
                                        "id": "IMG_0085",
                                        "thumb": "thumbs/DSC01242.jpg",
                                        "original": "originals/DSC01242.jpg"
                                },
                                {
                                        "id": "IMG_0086",
                                        "thumb": "thumbs/DSC01248.jpg",
                                        "original": "originals/DSC01248.jpg"
                                },
                                {
                                        "id": "IMG_0087",
                                        "thumb": "thumbs/DSC01252.jpg",
                                        "original": "originals/DSC01252.jpg"
                                },
                                {
                                        "id": "IMG_0088",
                                        "thumb": "thumbs/DSC01257.jpg",
                                        "original": "originals/DSC01257.jpg"
                                },
                                {
                                        "id": "IMG_0089",
                                        "thumb": "thumbs/DSC01262.jpg",
                                        "original": "originals/DSC01262.jpg"
                                },
                                {
                                        "id": "IMG_0090",
                                        "thumb": "thumbs/DSC01268.jpg",
                                        "original": "originals/DSC01268.jpg"
                                },
                                {
                                        "id": "IMG_0091",
                                        "thumb": "thumbs/DSC01269.jpg",
                                        "original": "originals/DSC01269.jpg"
                                },
                                {
                                        "id": "IMG_0092",
                                        "thumb": "thumbs/DSC01274.jpg",
                                        "original": "originals/DSC01274.jpg"
                                },
                                {
                                        "id": "IMG_0093",
                                        "thumb": "thumbs/DSC01282.jpg",
                                        "original": "originals/DSC01282.jpg"
                                },
                                {
                                        "id": "IMG_0094",
                                        "thumb": "thumbs/DSC01291.jpg",
                                        "original": "originals/DSC01291.jpg"
                                },
                                {
                                        "id": "IMG_0095",
                                        "thumb": "thumbs/DSC01317.jpg",
                                        "original": "originals/DSC01317.jpg"
                                },
                                {
                                        "id": "IMG_0096",
                                        "thumb": "thumbs/DSC01319.jpg",
                                        "original": "originals/DSC01319.jpg"
                                },
                                {
                                        "id": "IMG_0097",
                                        "thumb": "thumbs/DSC01331.jpg",
                                        "original": "originals/DSC01331.jpg"
                                },
                                {
                                        "id": "IMG_0098",
                                        "thumb": "thumbs/DSC01334.jpg",
                                        "original": "originals/DSC01334.jpg"
                                },
                                {
                                        "id": "IMG_0099",
                                        "thumb": "thumbs/DSC01341.jpg",
                                        "original": "originals/DSC01341.jpg"
                                },
                                {
                                        "id": "IMG_0100",
                                        "thumb": "thumbs/DSC01343.jpg",
                                        "original": "originals/DSC01343.jpg"
                                },
                                {
                                        "id": "IMG_0101",
                                        "thumb": "thumbs/DSC01349.jpg",
                                        "original": "originals/DSC01349.jpg"
                                },
                                {
                                        "id": "IMG_0102",
                                        "thumb": "thumbs/DSC01356.jpg",
                                        "original": "originals/DSC01356.jpg"
                                },
                                {
                                        "id": "IMG_0103",
                                        "thumb": "thumbs/DSC01361.jpg",
                                        "original": "originals/DSC01361.jpg"
                                },
                                {
                                        "id": "IMG_0104",
                                        "thumb": "thumbs/DSC01365.jpg",
                                        "original": "originals/DSC01365.jpg"
                                },
                                {
                                        "id": "IMG_0105",
                                        "thumb": "thumbs/DSC01375.jpg",
                                        "original": "originals/DSC01375.jpg"
                                },
                                {
                                        "id": "IMG_0106",
                                        "thumb": "thumbs/DSC01380.jpg",
                                        "original": "originals/DSC01380.jpg"
                                },
                                {
                                        "id": "IMG_0107",
                                        "thumb": "thumbs/DSC01386.jpg",
                                        "original": "originals/DSC01386.jpg"
                                },
                                {
                                        "id": "IMG_0108",
                                        "thumb": "thumbs/DSC01395.jpg",
                                        "original": "originals/DSC01395.jpg"
                                },
                                {
                                        "id": "IMG_0109",
                                        "thumb": "thumbs/DSC01399.jpg",
                                        "original": "originals/DSC01399.jpg"
                                },
                                {
                                        "id": "IMG_0110",
                                        "thumb": "thumbs/DSC01406.jpg",
                                        "original": "originals/DSC01406.jpg"
                                },
                                {
                                        "id": "IMG_0111",
                                        "thumb": "thumbs/DSC01409.jpg",
                                        "original": "originals/DSC01409.jpg"
                                },
                                {
                                        "id": "IMG_0112",
                                        "thumb": "thumbs/DSC01414.jpg",
                                        "original": "originals/DSC01414.jpg"
                                },
                                {
                                        "id": "IMG_0113",
                                        "thumb": "thumbs/DSC01418.jpg",
                                        "original": "originals/DSC01418.jpg"
                                },
                                {
                                        "id": "IMG_0114",
                                        "thumb": "thumbs/DSC01426.jpg",
                                        "original": "originals/DSC01426.jpg"
                                },
                                {
                                        "id": "IMG_0115",
                                        "thumb": "thumbs/DSC01435.jpg",
                                        "original": "originals/DSC01435.jpg"
                                },
                                {
                                        "id": "IMG_0116",
                                        "thumb": "thumbs/DSC01436.jpg",
                                        "original": "originals/DSC01436.jpg"
                                },
                                {
                                        "id": "IMG_0117",
                                        "thumb": "thumbs/DSC01442.jpg",
                                        "original": "originals/DSC01442.jpg"
                                },
                                {
                                        "id": "IMG_0118",
                                        "thumb": "thumbs/DSC01449.jpg",
                                        "original": "originals/DSC01449.jpg"
                                },
                                {
                                        "id": "IMG_0119",
                                        "thumb": "thumbs/DSC01456.jpg",
                                        "original": "originals/DSC01456.jpg"
                                },
                                {
                                        "id": "IMG_0120",
                                        "thumb": "thumbs/DSC01457.jpg",
                                        "original": "originals/DSC01457.jpg"
                                },
                                {
                                        "id": "IMG_0121",
                                        "thumb": "thumbs/DSC01466.jpg",
                                        "original": "originals/DSC01466.jpg"
                                },
                                {
                                        "id": "IMG_0122",
                                        "thumb": "thumbs/DSC01468.jpg",
                                        "original": "originals/DSC01468.jpg"
                                },
                                {
                                        "id": "IMG_0123",
                                        "thumb": "thumbs/DSC01469.jpg",
                                        "original": "originals/DSC01469.jpg"
                                },
                                {
                                        "id": "IMG_0124",
                                        "thumb": "thumbs/DSC01470.jpg",
                                        "original": "originals/DSC01470.jpg"
                                },
                                {
                                        "id": "IMG_0125",
                                        "thumb": "thumbs/DSC01471.jpg",
                                        "original": "originals/DSC01471.jpg"
                                },
                                {
                                        "id": "IMG_0126",
                                        "thumb": "thumbs/DSC01475.jpg",
                                        "original": "originals/DSC01475.jpg"
                                },
                                {
                                        "id": "IMG_0127",
                                        "thumb": "thumbs/DSC01479.jpg",
                                        "original": "originals/DSC01479.jpg"
                                },
                                {
                                        "id": "IMG_0128",
                                        "thumb": "thumbs/DSC01485.jpg",
                                        "original": "originals/DSC01485.jpg"
                                },
                                {
                                        "id": "IMG_0129",
                                        "thumb": "thumbs/DSC01489.jpg",
                                        "original": "originals/DSC01489.jpg"
                                },
                                {
                                        "id": "IMG_0130",
                                        "thumb": "thumbs/DSC01495.jpg",
                                        "original": "originals/DSC01495.jpg"
                                },
                                {
                                        "id": "IMG_0131",
                                        "thumb": "thumbs/DSC01501.jpg",
                                        "original": "originals/DSC01501.jpg"
                                },
                                {
                                        "id": "IMG_0132",
                                        "thumb": "thumbs/DSC01506.jpg",
                                        "original": "originals/DSC01506.jpg"
                                },
                                {
                                        "id": "IMG_0133",
                                        "thumb": "thumbs/DSC01511.jpg",
                                        "original": "originals/DSC01511.jpg"
                                },
                                {
                                        "id": "IMG_0134",
                                        "thumb": "thumbs/DSC01514.jpg",
                                        "original": "originals/DSC01514.jpg"
                                },
                                {
                                        "id": "IMG_0135",
                                        "thumb": "thumbs/DSC01522.jpg",
                                        "original": "originals/DSC01522.jpg"
                                },
                                {
                                        "id": "IMG_0136",
                                        "thumb": "thumbs/DSC01533.jpg",
                                        "original": "originals/DSC01533.jpg"
                                },
                                {
                                        "id": "IMG_0137",
                                        "thumb": "thumbs/DSC01540.jpg",
                                        "original": "originals/DSC01540.jpg"
                                },
                                {
                                        "id": "IMG_0138",
                                        "thumb": "thumbs/DSC01553.jpg",
                                        "original": "originals/DSC01553.jpg"
                                },
                                {
                                        "id": "IMG_0139",
                                        "thumb": "thumbs/DSC01562.jpg",
                                        "original": "originals/DSC01562.jpg"
                                },
                                {
                                        "id": "IMG_0140",
                                        "thumb": "thumbs/DSC01568.jpg",
                                        "original": "originals/DSC01568.jpg"
                                },
                                {
                                        "id": "IMG_0141",
                                        "thumb": "thumbs/DSC01574.jpg",
                                        "original": "originals/DSC01574.jpg"
                                },
                                {
                                        "id": "IMG_0142",
                                        "thumb": "thumbs/DSC01581.jpg",
                                        "original": "originals/DSC01581.jpg"
                                },
                                {
                                        "id": "IMG_0143",
                                        "thumb": "thumbs/DSC01584.jpg",
                                        "original": "originals/DSC01584.jpg"
                                },
                                {
                                        "id": "IMG_0144",
                                        "thumb": "thumbs/DSC01589.jpg",
                                        "original": "originals/DSC01589.jpg"
                                },
                                {
                                        "id": "IMG_0145",
                                        "thumb": "thumbs/DSC01597.jpg",
                                        "original": "originals/DSC01597.jpg"
                                },
                                {
                                        "id": "IMG_0146",
                                        "thumb": "thumbs/DSC01599.jpg",
                                        "original": "originals/DSC01599.jpg"
                                },
                                {
                                        "id": "IMG_0147",
                                        "thumb": "thumbs/DSC01603.jpg",
                                        "original": "originals/DSC01603.jpg"
                                },
                                {
                                        "id": "IMG_0148",
                                        "thumb": "thumbs/DSC01608.jpg",
                                        "original": "originals/DSC01608.jpg"
                                },
                                {
                                        "id": "IMG_0149",
                                        "thumb": "thumbs/DSC01616.jpg",
                                        "original": "originals/DSC01616.jpg"
                                },
                                {
                                        "id": "IMG_0150",
                                        "thumb": "thumbs/DSC01621.jpg",
                                        "original": "originals/DSC01621.jpg"
                                },
                                {
                                        "id": "IMG_0151",
                                        "thumb": "thumbs/DSC01625.jpg",
                                        "original": "originals/DSC01625.jpg"
                                },
                                {
                                        "id": "IMG_0152",
                                        "thumb": "thumbs/DSC01627.jpg",
                                        "original": "originals/DSC01627.jpg"
                                },
                                {
                                        "id": "IMG_0153",
                                        "thumb": "thumbs/DSC01629.jpg",
                                        "original": "originals/DSC01629.jpg"
                                },
                                {
                                        "id": "IMG_0154",
                                        "thumb": "thumbs/DSC01631.jpg",
                                        "original": "originals/DSC01631.jpg"
                                },
                                {
                                        "id": "IMG_0155",
                                        "thumb": "thumbs/DSC01634.jpg",
                                        "original": "originals/DSC01634.jpg"
                                },
                                {
                                        "id": "IMG_0156",
                                        "thumb": "thumbs/DSC01638.jpg",
                                        "original": "originals/DSC01638.jpg"
                                },
                                {
                                        "id": "IMG_0157",
                                        "thumb": "thumbs/DSC01643.jpg",
                                        "original": "originals/DSC01643.jpg"
                                },
                                {
                                        "id": "IMG_0158",
                                        "thumb": "thumbs/DSC01648.jpg",
                                        "original": "originals/DSC01648.jpg"
                                },
                                {
                                        "id": "IMG_0159",
                                        "thumb": "thumbs/DSC01651.jpg",
                                        "original": "originals/DSC01651.jpg"
                                },
                                {
                                        "id": "IMG_0160",
                                        "thumb": "thumbs/DSC01658.jpg",
                                        "original": "originals/DSC01658.jpg"
                                },
                                {
                                        "id": "IMG_0161",
                                        "thumb": "thumbs/DSC01661.jpg",
                                        "original": "originals/DSC01661.jpg"
                                },
                                {
                                        "id": "IMG_0162",
                                        "thumb": "thumbs/DSC01668.jpg",
                                        "original": "originals/DSC01668.jpg"
                                },
                                {
                                        "id": "IMG_0163",
                                        "thumb": "thumbs/DSC01676.jpg",
                                        "original": "originals/DSC01676.jpg"
                                },
                                {
                                        "id": "IMG_0164",
                                        "thumb": "thumbs/DSC01681.jpg",
                                        "original": "originals/DSC01681.jpg"
                                },
                                {
                                        "id": "IMG_0165",
                                        "thumb": "thumbs/DSC01685.jpg",
                                        "original": "originals/DSC01685.jpg"
                                },
                                {
                                        "id": "IMG_0166",
                                        "thumb": "thumbs/DSC01686.jpg",
                                        "original": "originals/DSC01686.jpg"
                                },
                                {
                                        "id": "IMG_0167",
                                        "thumb": "thumbs/DSC01687.jpg",
                                        "original": "originals/DSC01687.jpg"
                                },
                                {
                                        "id": "IMG_0168",
                                        "thumb": "thumbs/DSC01692.jpg",
                                        "original": "originals/DSC01692.jpg"
                                },
                                {
                                        "id": "IMG_0169",
                                        "thumb": "thumbs/DSC01699.jpg",
                                        "original": "originals/DSC01699.jpg"
                                },
                                {
                                        "id": "IMG_0170",
                                        "thumb": "thumbs/DSC01700.jpg",
                                        "original": "originals/DSC01700.jpg"
                                },
                                {
                                        "id": "IMG_0171",
                                        "thumb": "thumbs/DSC01704.jpg",
                                        "original": "originals/DSC01704.jpg"
                                },
                                {
                                        "id": "IMG_0172",
                                        "thumb": "thumbs/DSC01708.jpg",
                                        "original": "originals/DSC01708.jpg"
                                },
                                {
                                        "id": "IMG_0173",
                                        "thumb": "thumbs/DSC01715.jpg",
                                        "original": "originals/DSC01715.jpg"
                                },
                                {
                                        "id": "IMG_0174",
                                        "thumb": "thumbs/DSC01729.jpg",
                                        "original": "originals/DSC01729.jpg"
                                },
                                {
                                        "id": "IMG_0175",
                                        "thumb": "thumbs/DSC01738.jpg",
                                        "original": "originals/DSC01738.jpg"
                                },
                                {
                                        "id": "IMG_0176",
                                        "thumb": "thumbs/DSC01744.jpg",
                                        "original": "originals/DSC01744.jpg"
                                },
                                {
                                        "id": "IMG_0177",
                                        "thumb": "thumbs/DSC01753.jpg",
                                        "original": "originals/DSC01753.jpg"
                                },
                                {
                                        "id": "IMG_0178",
                                        "thumb": "thumbs/DSC01754.jpg",
                                        "original": "originals/DSC01754.jpg"
                                },
                                {
                                        "id": "IMG_0179",
                                        "thumb": "thumbs/DSC01760.jpg",
                                        "original": "originals/DSC01760.jpg"
                                },
                                {
                                        "id": "IMG_0180",
                                        "thumb": "thumbs/DSC01763.jpg",
                                        "original": "originals/DSC01763.jpg"
                                },
                                {
                                        "id": "IMG_0181",
                                        "thumb": "thumbs/DSC01767.jpg",
                                        "original": "originals/DSC01767.jpg"
                                },
                                {
                                        "id": "IMG_0182",
                                        "thumb": "thumbs/DSC01771.jpg",
                                        "original": "originals/DSC01771.jpg"
                                },
                                {
                                        "id": "IMG_0183",
                                        "thumb": "thumbs/DSC01781.jpg",
                                        "original": "originals/DSC01781.jpg"
                                },
                                {
                                        "id": "IMG_0184",
                                        "thumb": "thumbs/DSC01785.jpg",
                                        "original": "originals/DSC01785.jpg"
                                },
                                {
                                        "id": "IMG_0185",
                                        "thumb": "thumbs/DSC01791.jpg",
                                        "original": "originals/DSC01791.jpg"
                                },
                                {
                                        "id": "IMG_0186",
                                        "thumb": "thumbs/DSC01807.jpg",
                                        "original": "originals/DSC01807.jpg"
                                },
                                {
                                        "id": "IMG_0187",
                                        "thumb": "thumbs/DSC01808.jpg",
                                        "original": "originals/DSC01808.jpg"
                                },
                                {
                                        "id": "IMG_0188",
                                        "thumb": "thumbs/DSC01811.jpg",
                                        "original": "originals/DSC01811.jpg"
                                },
                                {
                                        "id": "IMG_0189",
                                        "thumb": "thumbs/DSC01819.jpg",
                                        "original": "originals/DSC01819.jpg"
                                },
                                {
                                        "id": "IMG_0190",
                                        "thumb": "thumbs/DSC01822.jpg",
                                        "original": "originals/DSC01822.jpg"
                                },
                                {
                                        "id": "IMG_0191",
                                        "thumb": "thumbs/DSC01825.jpg",
                                        "original": "originals/DSC01825.jpg"
                                },
                                {
                                        "id": "IMG_0192",
                                        "thumb": "thumbs/DSC01836.jpg",
                                        "original": "originals/DSC01836.jpg"
                                },
                                {
                                        "id": "IMG_0193",
                                        "thumb": "thumbs/DSC01843.jpg",
                                        "original": "originals/DSC01843.jpg"
                                },
                                {
                                        "id": "IMG_0194",
                                        "thumb": "thumbs/DSC01844.jpg",
                                        "original": "originals/DSC01844.jpg"
                                },
                                {
                                        "id": "IMG_0195",
                                        "thumb": "thumbs/DSC01847.jpg",
                                        "original": "originals/DSC01847.jpg"
                                },
                                {
                                        "id": "IMG_0196",
                                        "thumb": "thumbs/DSC01849.jpg",
                                        "original": "originals/DSC01849.jpg"
                                },
                                {
                                        "id": "IMG_0197",
                                        "thumb": "thumbs/DSC01852.jpg",
                                        "original": "originals/DSC01852.jpg"
                                },
                                {
                                        "id": "IMG_0198",
                                        "thumb": "thumbs/DSC01854.jpg",
                                        "original": "originals/DSC01854.jpg"
                                },
                                {
                                        "id": "IMG_0199",
                                        "thumb": "thumbs/DSC01856.jpg",
                                        "original": "originals/DSC01856.jpg"
                                },
                                {
                                        "id": "IMG_0200",
                                        "thumb": "thumbs/DSC01857.jpg",
                                        "original": "originals/DSC01857.jpg"
                                },
                                {
                                        "id": "IMG_0201",
                                        "thumb": "thumbs/DSC01859.jpg",
                                        "original": "originals/DSC01859.jpg"
                                },
                                {
                                        "id": "IMG_0202",
                                        "thumb": "thumbs/DSC01861.jpg",
                                        "original": "originals/DSC01861.jpg"
                                },
                                {
                                        "id": "IMG_0203",
                                        "thumb": "thumbs/DSC01864.jpg",
                                        "original": "originals/DSC01864.jpg"
                                },
                                {
                                        "id": "IMG_0204",
                                        "thumb": "thumbs/DSC01867.jpg",
                                        "original": "originals/DSC01867.jpg"
                                },
                                {
                                        "id": "IMG_0205",
                                        "thumb": "thumbs/DSC01871.jpg",
                                        "original": "originals/DSC01871.jpg"
                                },
                                {
                                        "id": "IMG_0206",
                                        "thumb": "thumbs/DSC01876.jpg",
                                        "original": "originals/DSC01876.jpg"
                                },
                                {
                                        "id": "IMG_0207",
                                        "thumb": "thumbs/DSC01883.jpg",
                                        "original": "originals/DSC01883.jpg"
                                },
                                {
                                        "id": "IMG_0208",
                                        "thumb": "thumbs/DSC01887.jpg",
                                        "original": "originals/DSC01887.jpg"
                                },
                                {
                                        "id": "IMG_0209",
                                        "thumb": "thumbs/DSC01888.jpg",
                                        "original": "originals/DSC01888.jpg"
                                },
                                {
                                        "id": "IMG_0210",
                                        "thumb": "thumbs/DSC01890.jpg",
                                        "original": "originals/DSC01890.jpg"
                                },
                                {
                                        "id": "IMG_0211",
                                        "thumb": "thumbs/DSC01895.jpg",
                                        "original": "originals/DSC01895.jpg"
                                },
                                {
                                        "id": "IMG_0212",
                                        "thumb": "thumbs/DSC01896.jpg",
                                        "original": "originals/DSC01896.jpg"
                                },
                                {
                                        "id": "IMG_0213",
                                        "thumb": "thumbs/DSC01903.jpg",
                                        "original": "originals/DSC01903.jpg"
                                },
                                {
                                        "id": "IMG_0214",
                                        "thumb": "thumbs/DSC01911.jpg",
                                        "original": "originals/DSC01911.jpg"
                                },
                                {
                                        "id": "IMG_0215",
                                        "thumb": "thumbs/DSC01913.jpg",
                                        "original": "originals/DSC01913.jpg"
                                },
                                {
                                        "id": "IMG_0216",
                                        "thumb": "thumbs/DSC01914.jpg",
                                        "original": "originals/DSC01914.jpg"
                                },
                                {
                                        "id": "IMG_0217",
                                        "thumb": "thumbs/DSC01919.jpg",
                                        "original": "originals/DSC01919.jpg"
                                },
                                {
                                        "id": "IMG_0218",
                                        "thumb": "thumbs/DSC01925.jpg",
                                        "original": "originals/DSC01925.jpg"
                                },
                                {
                                        "id": "IMG_0219",
                                        "thumb": "thumbs/DSC01927.jpg",
                                        "original": "originals/DSC01927.jpg"
                                },
                                {
                                        "id": "IMG_0220",
                                        "thumb": "thumbs/DSC01931.jpg",
                                        "original": "originals/DSC01931.jpg"
                                },
                                {
                                        "id": "IMG_0221",
                                        "thumb": "thumbs/DSC01939.jpg",
                                        "original": "originals/DSC01939.jpg"
                                },
                                {
                                        "id": "IMG_0222",
                                        "thumb": "thumbs/DSC01940.jpg",
                                        "original": "originals/DSC01940.jpg"
                                },
                                {
                                        "id": "IMG_0223",
                                        "thumb": "thumbs/DSC01943.jpg",
                                        "original": "originals/DSC01943.jpg"
                                },
                                {
                                        "id": "IMG_0224",
                                        "thumb": "thumbs/DSC01946.jpg",
                                        "original": "originals/DSC01946.jpg"
                                },
                                {
                                        "id": "IMG_0225",
                                        "thumb": "thumbs/DSC01952.jpg",
                                        "original": "originals/DSC01952.jpg"
                                },
                                {
                                        "id": "IMG_0226",
                                        "thumb": "thumbs/DSC01953.jpg",
                                        "original": "originals/DSC01953.jpg"
                                },
                                {
                                        "id": "IMG_0227",
                                        "thumb": "thumbs/DSC01954.jpg",
                                        "original": "originals/DSC01954.jpg"
                                },
                                {
                                        "id": "IMG_0228",
                                        "thumb": "thumbs/DSC01955.jpg",
                                        "original": "originals/DSC01955.jpg"
                                },
                                {
                                        "id": "IMG_0229",
                                        "thumb": "thumbs/DSC01961.jpg",
                                        "original": "originals/DSC01961.jpg"
                                },
                                {
                                        "id": "IMG_0230",
                                        "thumb": "thumbs/DSC01962.jpg",
                                        "original": "originals/DSC01962.jpg"
                                },
                                {
                                        "id": "IMG_0231",
                                        "thumb": "thumbs/DSC01974.jpg",
                                        "original": "originals/DSC01974.jpg"
                                },
                                {
                                        "id": "IMG_0232",
                                        "thumb": "thumbs/DSC01979.jpg",
                                        "original": "originals/DSC01979.jpg"
                                },
                                {
                                        "id": "IMG_0233",
                                        "thumb": "thumbs/DSC01985.jpg",
                                        "original": "originals/DSC01985.jpg"
                                },
                                {
                                        "id": "IMG_0234",
                                        "thumb": "thumbs/DSC01990.jpg",
                                        "original": "originals/DSC01990.jpg"
                                },
                                {
                                        "id": "IMG_0235",
                                        "thumb": "thumbs/DSC01995.jpg",
                                        "original": "originals/DSC01995.jpg"
                                },
                                {
                                        "id": "IMG_0236",
                                        "thumb": "thumbs/DSC02003.jpg",
                                        "original": "originals/DSC02003.jpg"
                                },
                                {
                                        "id": "IMG_0237",
                                        "thumb": "thumbs/DSC02011.jpg",
                                        "original": "originals/DSC02011.jpg"
                                },
                                {
                                        "id": "IMG_0238",
                                        "thumb": "thumbs/DSC02015.jpg",
                                        "original": "originals/DSC02015.jpg"
                                },
                                {
                                        "id": "IMG_0239",
                                        "thumb": "thumbs/DSC02019.jpg",
                                        "original": "originals/DSC02019.jpg"
                                },
                                {
                                        "id": "IMG_0240",
                                        "thumb": "thumbs/DSC02025.jpg",
                                        "original": "originals/DSC02025.jpg"
                                },
                                {
                                        "id": "IMG_0241",
                                        "thumb": "thumbs/DSC02030.jpg",
                                        "original": "originals/DSC02030.jpg"
                                },
                                {
                                        "id": "IMG_0242",
                                        "thumb": "thumbs/DSC02046.jpg",
                                        "original": "originals/DSC02046.jpg"
                                },
                                {
                                        "id": "IMG_0243",
                                        "thumb": "thumbs/DSC02050.jpg",
                                        "original": "originals/DSC02050.jpg"
                                },
                                {
                                        "id": "IMG_0244",
                                        "thumb": "thumbs/DSC02054.jpg",
                                        "original": "originals/DSC02054.jpg"
                                },
                                {
                                        "id": "IMG_0245",
                                        "thumb": "thumbs/DSC02060.jpg",
                                        "original": "originals/DSC02060.jpg"
                                },
                                {
                                        "id": "IMG_0246",
                                        "thumb": "thumbs/DSC02065.jpg",
                                        "original": "originals/DSC02065.jpg"
                                },
                                {
                                        "id": "IMG_0247",
                                        "thumb": "thumbs/DSC02073.jpg",
                                        "original": "originals/DSC02073.jpg"
                                },
                                {
                                        "id": "IMG_0248",
                                        "thumb": "thumbs/DSC02074.jpg",
                                        "original": "originals/DSC02074.jpg"
                                },
                                {
                                        "id": "IMG_0249",
                                        "thumb": "thumbs/DSC02078.jpg",
                                        "original": "originals/DSC02078.jpg"
                                },
                                {
                                        "id": "IMG_0250",
                                        "thumb": "thumbs/DSC02081.jpg",
                                        "original": "originals/DSC02081.jpg"
                                },
                                {
                                        "id": "IMG_0251",
                                        "thumb": "thumbs/DSC02085.jpg",
                                        "original": "originals/DSC02085.jpg"
                                },
                                {
                                        "id": "IMG_0252",
                                        "thumb": "thumbs/DSC02092.jpg",
                                        "original": "originals/DSC02092.jpg"
                                },
                                {
                                        "id": "IMG_0253",
                                        "thumb": "thumbs/DSC02095.jpg",
                                        "original": "originals/DSC02095.jpg"
                                },
                                {
                                        "id": "IMG_0254",
                                        "thumb": "thumbs/DSC02102.jpg",
                                        "original": "originals/DSC02102.jpg"
                                },
                                {
                                        "id": "IMG_0255",
                                        "thumb": "thumbs/DSC02105.jpg",
                                        "original": "originals/DSC02105.jpg"
                                },
                                {
                                        "id": "IMG_0256",
                                        "thumb": "thumbs/DSC02108.jpg",
                                        "original": "originals/DSC02108.jpg"
                                },
                                {
                                        "id": "IMG_0257",
                                        "thumb": "thumbs/DSC02116.jpg",
                                        "original": "originals/DSC02116.jpg"
                                },
                                {
                                        "id": "IMG_0258",
                                        "thumb": "thumbs/DSC02118.jpg",
                                        "original": "originals/DSC02118.jpg"
                                },
                                {
                                        "id": "IMG_0259",
                                        "thumb": "thumbs/DSC02128.jpg",
                                        "original": "originals/DSC02128.jpg"
                                },
                                {
                                        "id": "IMG_0260",
                                        "thumb": "thumbs/DSC02132.jpg",
                                        "original": "originals/DSC02132.jpg"
                                },
                                {
                                        "id": "IMG_0261",
                                        "thumb": "thumbs/DSC02135.jpg",
                                        "original": "originals/DSC02135.jpg"
                                },
                                {
                                        "id": "IMG_0262",
                                        "thumb": "thumbs/DSC02141.jpg",
                                        "original": "originals/DSC02141.jpg"
                                },
                                {
                                        "id": "IMG_0263",
                                        "thumb": "thumbs/DSC02149.jpg",
                                        "original": "originals/DSC02149.jpg"
                                },
                                {
                                        "id": "IMG_0264",
                                        "thumb": "thumbs/DSC02150.jpg",
                                        "original": "originals/DSC02150.jpg"
                                },
                                {
                                        "id": "IMG_0265",
                                        "thumb": "thumbs/DSC02152.jpg",
                                        "original": "originals/DSC02152.jpg"
                                },
                                {
                                        "id": "IMG_0266",
                                        "thumb": "thumbs/DSC02159.jpg",
                                        "original": "originals/DSC02159.jpg"
                                },
                                {
                                        "id": "IMG_0267",
                                        "thumb": "thumbs/DSC02169.jpg",
                                        "original": "originals/DSC02169.jpg"
                                },
                                {
                                        "id": "IMG_0268",
                                        "thumb": "thumbs/DSC02172.jpg",
                                        "original": "originals/DSC02172.jpg"
                                },
                                {
                                        "id": "IMG_0269",
                                        "thumb": "thumbs/DSC02176.jpg",
                                        "original": "originals/DSC02176.jpg"
                                },
                                {
                                        "id": "IMG_0270",
                                        "thumb": "thumbs/DSC02191.jpg",
                                        "original": "originals/DSC02191.jpg"
                                },
                                {
                                        "id": "IMG_0271",
                                        "thumb": "thumbs/DSC02198.jpg",
                                        "original": "originals/DSC02198.jpg"
                                },
                                {
                                        "id": "IMG_0272",
                                        "thumb": "thumbs/DSC02199.jpg",
                                        "original": "originals/DSC02199.jpg"
                                },
                                {
                                        "id": "IMG_0273",
                                        "thumb": "thumbs/DSC02211.jpg",
                                        "original": "originals/DSC02211.jpg"
                                },
                                {
                                        "id": "IMG_0274",
                                        "thumb": "thumbs/DSC02215.jpg",
                                        "original": "originals/DSC02215.jpg"
                                },
                                {
                                        "id": "IMG_0275",
                                        "thumb": "thumbs/DSC02218.jpg",
                                        "original": "originals/DSC02218.jpg"
                                },
                                {
                                        "id": "IMG_0276",
                                        "thumb": "thumbs/DSC02226.jpg",
                                        "original": "originals/DSC02226.jpg"
                                },
                                {
                                        "id": "IMG_0277",
                                        "thumb": "thumbs/DSC02229.jpg",
                                        "original": "originals/DSC02229.jpg"
                                },
                                {
                                        "id": "IMG_0278",
                                        "thumb": "thumbs/DSC02230.jpg",
                                        "original": "originals/DSC02230.jpg"
                                },
                                {
                                        "id": "IMG_0279",
                                        "thumb": "thumbs/DSC02231.jpg",
                                        "original": "originals/DSC02231.jpg"
                                },
                                {
                                        "id": "IMG_0280",
                                        "thumb": "thumbs/DSC02232.jpg",
                                        "original": "originals/DSC02232.jpg"
                                },
                                {
                                        "id": "IMG_0281",
                                        "thumb": "thumbs/DSC02234.jpg",
                                        "original": "originals/DSC02234.jpg"
                                },
                                {
                                        "id": "IMG_0282",
                                        "thumb": "thumbs/DSC02236.jpg",
                                        "original": "originals/DSC02236.jpg"
                                },
                                {
                                        "id": "IMG_0283",
                                        "thumb": "thumbs/DSC02245.jpg",
                                        "original": "originals/DSC02245.jpg"
                                },
                                {
                                        "id": "IMG_0284",
                                        "thumb": "thumbs/DSC02255.jpg",
                                        "original": "originals/DSC02255.jpg"
                                },
                                {
                                        "id": "IMG_0285",
                                        "thumb": "thumbs/DSC02260.jpg",
                                        "original": "originals/DSC02260.jpg"
                                },
                                {
                                        "id": "IMG_0286",
                                        "thumb": "thumbs/DSC02263.jpg",
                                        "original": "originals/DSC02263.jpg"
                                },
                                {
                                        "id": "IMG_0287",
                                        "thumb": "thumbs/DSC02264.jpg",
                                        "original": "originals/DSC02264.jpg"
                                },
                                {
                                        "id": "IMG_0288",
                                        "thumb": "thumbs/DSC02272.jpg",
                                        "original": "originals/DSC02272.jpg"
                                },
                                {
                                        "id": "IMG_0289",
                                        "thumb": "thumbs/DSC02279.jpg",
                                        "original": "originals/DSC02279.jpg"
                                },
                                {
                                        "id": "IMG_0290",
                                        "thumb": "thumbs/DSC02281.jpg",
                                        "original": "originals/DSC02281.jpg"
                                },
                                {
                                        "id": "IMG_0291",
                                        "thumb": "thumbs/DSC02294.jpg",
                                        "original": "originals/DSC02294.jpg"
                                },
                                {
                                        "id": "IMG_0292",
                                        "thumb": "thumbs/DSC02298.jpg",
                                        "original": "originals/DSC02298.jpg"
                                },
                                {
                                        "id": "IMG_0293",
                                        "thumb": "thumbs/DSC02305.jpg",
                                        "original": "originals/DSC02305.jpg"
                                },
                                {
                                        "id": "IMG_0294",
                                        "thumb": "thumbs/DSC02308.jpg",
                                        "original": "originals/DSC02308.jpg"
                                },
                                {
                                        "id": "IMG_0295",
                                        "thumb": "thumbs/DSC02315.jpg",
                                        "original": "originals/DSC02315.jpg"
                                },
                                {
                                        "id": "IMG_0296",
                                        "thumb": "thumbs/DSC02319.jpg",
                                        "original": "originals/DSC02319.jpg"
                                },
                                {
                                        "id": "IMG_0297",
                                        "thumb": "thumbs/DSC02324.jpg",
                                        "original": "originals/DSC02324.jpg"
                                },
                                {
                                        "id": "IMG_0298",
                                        "thumb": "thumbs/DSC02329.jpg",
                                        "original": "originals/DSC02329.jpg"
                                },
                                {
                                        "id": "IMG_0299",
                                        "thumb": "thumbs/DSC02334.jpg",
                                        "original": "originals/DSC02334.jpg"
                                },
                                {
                                        "id": "IMG_0300",
                                        "thumb": "thumbs/DSC02338.jpg",
                                        "original": "originals/DSC02338.jpg"
                                },
                                {
                                        "id": "IMG_0301",
                                        "thumb": "thumbs/DSC02342.jpg",
                                        "original": "originals/DSC02342.jpg"
                                },
                                {
                                        "id": "IMG_0302",
                                        "thumb": "thumbs/DSC02345.jpg",
                                        "original": "originals/DSC02345.jpg"
                                },
                                {
                                        "id": "IMG_0303",
                                        "thumb": "thumbs/DSC02348.jpg",
                                        "original": "originals/DSC02348.jpg"
                                },
                                {
                                        "id": "IMG_0304",
                                        "thumb": "thumbs/DSC02351.jpg",
                                        "original": "originals/DSC02351.jpg"
                                },
                                {
                                        "id": "IMG_0305",
                                        "thumb": "thumbs/DSC02366.jpg",
                                        "original": "originals/DSC02366.jpg"
                                },
                                {
                                        "id": "IMG_0306",
                                        "thumb": "thumbs/DSC02370.jpg",
                                        "original": "originals/DSC02370.jpg"
                                },
                                {
                                        "id": "IMG_0307",
                                        "thumb": "thumbs/DSC02376.jpg",
                                        "original": "originals/DSC02376.jpg"
                                },
                                {
                                        "id": "IMG_0308",
                                        "thumb": "thumbs/DSC02379.jpg",
                                        "original": "originals/DSC02379.jpg"
                                },
                                {
                                        "id": "IMG_0309",
                                        "thumb": "thumbs/DSC02384.jpg",
                                        "original": "originals/DSC02384.jpg"
                                },
                                {
                                        "id": "IMG_0310",
                                        "thumb": "thumbs/DSC02387.jpg",
                                        "original": "originals/DSC02387.jpg"
                                },
                                {
                                        "id": "IMG_0311",
                                        "thumb": "thumbs/DSC02390.jpg",
                                        "original": "originals/DSC02390.jpg"
                                },
                                {
                                        "id": "IMG_0312",
                                        "thumb": "thumbs/DSC02392.jpg",
                                        "original": "originals/DSC02392.jpg"
                                },
                                {
                                        "id": "IMG_0313",
                                        "thumb": "thumbs/DSC02399.jpg",
                                        "original": "originals/DSC02399.jpg"
                                },
                                {
                                        "id": "IMG_0314",
                                        "thumb": "thumbs/DSC02405.jpg",
                                        "original": "originals/DSC02405.jpg"
                                },
                                {
                                        "id": "IMG_0315",
                                        "thumb": "thumbs/DSC02407.jpg",
                                        "original": "originals/DSC02407.jpg"
                                },
                                {
                                        "id": "IMG_0316",
                                        "thumb": "thumbs/DSC02417.jpg",
                                        "original": "originals/DSC02417.jpg"
                                },
                                {
                                        "id": "IMG_0317",
                                        "thumb": "thumbs/DSC02422.jpg",
                                        "original": "originals/DSC02422.jpg"
                                },
                                {
                                        "id": "IMG_0318",
                                        "thumb": "thumbs/DSC02433.jpg",
                                        "original": "originals/DSC02433.jpg"
                                },
                                {
                                        "id": "IMG_0319",
                                        "thumb": "thumbs/DSC02436.jpg",
                                        "original": "originals/DSC02436.jpg"
                                },
                                {
                                        "id": "IMG_0320",
                                        "thumb": "thumbs/DSC02444.jpg",
                                        "original": "originals/DSC02444.jpg"
                                },
                                {
                                        "id": "IMG_0321",
                                        "thumb": "thumbs/DSC02447.jpg",
                                        "original": "originals/DSC02447.jpg"
                                },
                                {
                                        "id": "IMG_0322",
                                        "thumb": "thumbs/DSC02450.jpg",
                                        "original": "originals/DSC02450.jpg"
                                },
                                {
                                        "id": "IMG_0323",
                                        "thumb": "thumbs/DSC02455.jpg",
                                        "original": "originals/DSC02455.jpg"
                                },
                                {
                                        "id": "IMG_0324",
                                        "thumb": "thumbs/DSC02458.jpg",
                                        "original": "originals/DSC02458.jpg"
                                },
                                {
                                        "id": "IMG_0325",
                                        "thumb": "thumbs/DSC02460.jpg",
                                        "original": "originals/DSC02460.jpg"
                                },
                                {
                                        "id": "IMG_0326",
                                        "thumb": "thumbs/DSC02463.jpg",
                                        "original": "originals/DSC02463.jpg"
                                },
                                {
                                        "id": "IMG_0327",
                                        "thumb": "thumbs/DSC02464.jpg",
                                        "original": "originals/DSC02464.jpg"
                                },
                                {
                                        "id": "IMG_0328",
                                        "thumb": "thumbs/DSC02467.jpg",
                                        "original": "originals/DSC02467.jpg"
                                },
                                {
                                        "id": "IMG_0329",
                                        "thumb": "thumbs/DSC02469.jpg",
                                        "original": "originals/DSC02469.jpg"
                                },
                                {
                                        "id": "IMG_0330",
                                        "thumb": "thumbs/DSC02476.jpg",
                                        "original": "originals/DSC02476.jpg"
                                },
                                {
                                        "id": "IMG_0331",
                                        "thumb": "thumbs/DSC02477.jpg",
                                        "original": "originals/DSC02477.jpg"
                                },
                                {
                                        "id": "IMG_0332",
                                        "thumb": "thumbs/DSC02481.jpg",
                                        "original": "originals/DSC02481.jpg"
                                },
                                {
                                        "id": "IMG_0333",
                                        "thumb": "thumbs/DSC02483.jpg",
                                        "original": "originals/DSC02483.jpg"
                                },
                                {
                                        "id": "IMG_0334",
                                        "thumb": "thumbs/DSC02490.jpg",
                                        "original": "originals/DSC02490.jpg"
                                },
                                {
                                        "id": "IMG_0335",
                                        "thumb": "thumbs/DSC02497.jpg",
                                        "original": "originals/DSC02497.jpg"
                                },
                                {
                                        "id": "IMG_0336",
                                        "thumb": "thumbs/DSC02501.jpg",
                                        "original": "originals/DSC02501.jpg"
                                },
                                {
                                        "id": "IMG_0337",
                                        "thumb": "thumbs/DSC02502.jpg",
                                        "original": "originals/DSC02502.jpg"
                                },
                                {
                                        "id": "IMG_0338",
                                        "thumb": "thumbs/DSC02507.jpg",
                                        "original": "originals/DSC02507.jpg"
                                },
                                {
                                        "id": "IMG_0339",
                                        "thumb": "thumbs/DSC02509.jpg",
                                        "original": "originals/DSC02509.jpg"
                                },
                                {
                                        "id": "IMG_0340",
                                        "thumb": "thumbs/DSC02513.jpg",
                                        "original": "originals/DSC02513.jpg"
                                },
                                {
                                        "id": "IMG_0341",
                                        "thumb": "thumbs/DSC02520.jpg",
                                        "original": "originals/DSC02520.jpg"
                                },
                                {
                                        "id": "IMG_0342",
                                        "thumb": "thumbs/DSC02523.jpg",
                                        "original": "originals/DSC02523.jpg"
                                },
                                {
                                        "id": "IMG_0343",
                                        "thumb": "thumbs/DSC02525.jpg",
                                        "original": "originals/DSC02525.jpg"
                                },
                                {
                                        "id": "IMG_0344",
                                        "thumb": "thumbs/DSC02527.jpg",
                                        "original": "originals/DSC02527.jpg"
                                },
                                {
                                        "id": "IMG_0345",
                                        "thumb": "thumbs/DSC03357.jpg",
                                        "original": "originals/DSC03357.jpg"
                                },
                                {
                                        "id": "IMG_0346",
                                        "thumb": "thumbs/DSC03359.jpg",
                                        "original": "originals/DSC03359.jpg"
                                },
                                {
                                        "id": "IMG_0347",
                                        "thumb": "thumbs/DSC03361.jpg",
                                        "original": "originals/DSC03361.jpg"
                                },
                                {
                                        "id": "IMG_0348",
                                        "thumb": "thumbs/DSC03363.jpg",
                                        "original": "originals/DSC03363.jpg"
                                },
                                {
                                        "id": "IMG_0349",
                                        "thumb": "thumbs/DSC03367.jpg",
                                        "original": "originals/DSC03367.jpg"
                                },
                                {
                                        "id": "IMG_0350",
                                        "thumb": "thumbs/DSC03373.jpg",
                                        "original": "originals/DSC03373.jpg"
                                },
                                {
                                        "id": "IMG_0351",
                                        "thumb": "thumbs/DSC03374.jpg",
                                        "original": "originals/DSC03374.jpg"
                                },
                                {
                                        "id": "IMG_0352",
                                        "thumb": "thumbs/DSC03379.jpg",
                                        "original": "originals/DSC03379.jpg"
                                },
                                {
                                        "id": "IMG_0353",
                                        "thumb": "thumbs/DSC03384.jpg",
                                        "original": "originals/DSC03384.jpg"
                                },
                                {
                                        "id": "IMG_0354",
                                        "thumb": "thumbs/DSC03389.jpg",
                                        "original": "originals/DSC03389.jpg"
                                },
                                {
                                        "id": "IMG_0355",
                                        "thumb": "thumbs/DSC03392.jpg",
                                        "original": "originals/DSC03392.jpg"
                                },
                                {
                                        "id": "IMG_0356",
                                        "thumb": "thumbs/DSC03398.jpg",
                                        "original": "originals/DSC03398.jpg"
                                },
                                {
                                        "id": "IMG_0357",
                                        "thumb": "thumbs/DSC03401.jpg",
                                        "original": "originals/DSC03401.jpg"
                                },
                                {
                                        "id": "IMG_0358",
                                        "thumb": "thumbs/DSC03407.jpg",
                                        "original": "originals/DSC03407.jpg"
                                },
                                {
                                        "id": "IMG_0359",
                                        "thumb": "thumbs/DSC03411.jpg",
                                        "original": "originals/DSC03411.jpg"
                                },
                                {
                                        "id": "IMG_0360",
                                        "thumb": "thumbs/DSC03418.jpg",
                                        "original": "originals/DSC03418.jpg"
                                },
                                {
                                        "id": "IMG_0361",
                                        "thumb": "thumbs/DSC03419.jpg",
                                        "original": "originals/DSC03419.jpg"
                                },
                                {
                                        "id": "IMG_0362",
                                        "thumb": "thumbs/DSC03420.jpg",
                                        "original": "originals/DSC03420.jpg"
                                },
                                {
                                        "id": "IMG_0363",
                                        "thumb": "thumbs/DSC03426.jpg",
                                        "original": "originals/DSC03426.jpg"
                                },
                                {
                                        "id": "IMG_0364",
                                        "thumb": "thumbs/DSC03435.jpg",
                                        "original": "originals/DSC03435.jpg"
                                },
                                {
                                        "id": "IMG_0365",
                                        "thumb": "thumbs/DSC03437.jpg",
                                        "original": "originals/DSC03437.jpg"
                                },
                                {
                                        "id": "IMG_0366",
                                        "thumb": "thumbs/DSC03438.jpg",
                                        "original": "originals/DSC03438.jpg"
                                },
                                {
                                        "id": "IMG_0367",
                                        "thumb": "thumbs/DSC03439.jpg",
                                        "original": "originals/DSC03439.jpg"
                                },
                                {
                                        "id": "IMG_0368",
                                        "thumb": "thumbs/DSC03444.jpg",
                                        "original": "originals/DSC03444.jpg"
                                },
                                {
                                        "id": "IMG_0369",
                                        "thumb": "thumbs/DSC03445.jpg",
                                        "original": "originals/DSC03445.jpg"
                                },
                                {
                                        "id": "IMG_0370",
                                        "thumb": "thumbs/DSC03447.jpg",
                                        "original": "originals/DSC03447.jpg"
                                },
                                {
                                        "id": "IMG_0371",
                                        "thumb": "thumbs/DSC03454.jpg",
                                        "original": "originals/DSC03454.jpg"
                                },
                                {
                                        "id": "IMG_0372",
                                        "thumb": "thumbs/DSC03455.jpg",
                                        "original": "originals/DSC03455.jpg"
                                },
                                {
                                        "id": "IMG_0373",
                                        "thumb": "thumbs/DSC03458.jpg",
                                        "original": "originals/DSC03458.jpg"
                                },
                                {
                                        "id": "IMG_0374",
                                        "thumb": "thumbs/DSC03464.jpg",
                                        "original": "originals/DSC03464.jpg"
                                },
                                {
                                        "id": "IMG_0375",
                                        "thumb": "thumbs/DSC03465.jpg",
                                        "original": "originals/DSC03465.jpg"
                                },
                                {
                                        "id": "IMG_0376",
                                        "thumb": "thumbs/DSC03469.jpg",
                                        "original": "originals/DSC03469.jpg"
                                },
                                {
                                        "id": "IMG_0377",
                                        "thumb": "thumbs/DSC03478.jpg",
                                        "original": "originals/DSC03478.jpg"
                                },
                                {
                                        "id": "IMG_0378",
                                        "thumb": "thumbs/DSC03479.jpg",
                                        "original": "originals/DSC03479.jpg"
                                },
                                {
                                        "id": "IMG_0379",
                                        "thumb": "thumbs/DSC03492.jpg",
                                        "original": "originals/DSC03492.jpg"
                                },
                                {
                                        "id": "IMG_0380",
                                        "thumb": "thumbs/DSC03500.jpg",
                                        "original": "originals/DSC03500.jpg"
                                },
                                {
                                        "id": "IMG_0381",
                                        "thumb": "thumbs/DSC03503.jpg",
                                        "original": "originals/DSC03503.jpg"
                                },
                                {
                                        "id": "IMG_0382",
                                        "thumb": "thumbs/DSC03507.jpg",
                                        "original": "originals/DSC03507.jpg"
                                },
                                {
                                        "id": "IMG_0383",
                                        "thumb": "thumbs/DSC03513.jpg",
                                        "original": "originals/DSC03513.jpg"
                                },
                                {
                                        "id": "IMG_0384",
                                        "thumb": "thumbs/DSC03514.jpg",
                                        "original": "originals/DSC03514.jpg"
                                },
                                {
                                        "id": "IMG_0385",
                                        "thumb": "thumbs/DSC03517.jpg",
                                        "original": "originals/DSC03517.jpg"
                                },
                                {
                                        "id": "IMG_0386",
                                        "thumb": "thumbs/DSC03520.jpg",
                                        "original": "originals/DSC03520.jpg"
                                },
                                {
                                        "id": "IMG_0387",
                                        "thumb": "thumbs/DSC03522.jpg",
                                        "original": "originals/DSC03522.jpg"
                                },
                                {
                                        "id": "IMG_0388",
                                        "thumb": "thumbs/DSC03524.jpg",
                                        "original": "originals/DSC03524.jpg"
                                },
                                {
                                        "id": "IMG_0389",
                                        "thumb": "thumbs/DSC03534.jpg",
                                        "original": "originals/DSC03534.jpg"
                                },
                                {
                                        "id": "IMG_0390",
                                        "thumb": "thumbs/DSC03537.jpg",
                                        "original": "originals/DSC03537.jpg"
                                },
                                {
                                        "id": "IMG_0391",
                                        "thumb": "thumbs/DSC03538.jpg",
                                        "original": "originals/DSC03538.jpg"
                                },
                                {
                                        "id": "IMG_0392",
                                        "thumb": "thumbs/DSC03540.jpg",
                                        "original": "originals/DSC03540.jpg"
                                },
                                {
                                        "id": "IMG_0393",
                                        "thumb": "thumbs/DSC03554.jpg",
                                        "original": "originals/DSC03554.jpg"
                                },
                                {
                                        "id": "IMG_0394",
                                        "thumb": "thumbs/DSC03559.jpg",
                                        "original": "originals/DSC03559.jpg"
                                },
                                {
                                        "id": "IMG_0395",
                                        "thumb": "thumbs/DSC03562.jpg",
                                        "original": "originals/DSC03562.jpg"
                                },
                                {
                                        "id": "IMG_0396",
                                        "thumb": "thumbs/DSC03575.jpg",
                                        "original": "originals/DSC03575.jpg"
                                },
                                {
                                        "id": "IMG_0397",
                                        "thumb": "thumbs/DSC03576.jpg",
                                        "original": "originals/DSC03576.jpg"
                                },
                                {
                                        "id": "IMG_0398",
                                        "thumb": "thumbs/DSC03581.jpg",
                                        "original": "originals/DSC03581.jpg"
                                },
                                {
                                        "id": "IMG_0399",
                                        "thumb": "thumbs/DSC03596.jpg",
                                        "original": "originals/DSC03596.jpg"
                                },
                                {
                                        "id": "IMG_0400",
                                        "thumb": "thumbs/DSC03606.jpg",
                                        "original": "originals/DSC03606.jpg"
                                },
                                {
                                        "id": "IMG_0401",
                                        "thumb": "thumbs/DSC03611.jpg",
                                        "original": "originals/DSC03611.jpg"
                                },
                                {
                                        "id": "IMG_0402",
                                        "thumb": "thumbs/DSC03623.jpg",
                                        "original": "originals/DSC03623.jpg"
                                },
                                {
                                        "id": "IMG_0403",
                                        "thumb": "thumbs/DSC03625.jpg",
                                        "original": "originals/DSC03625.jpg"
                                },
                                {
                                        "id": "IMG_0404",
                                        "thumb": "thumbs/DSC03628.jpg",
                                        "original": "originals/DSC03628.jpg"
                                },
                                {
                                        "id": "IMG_0405",
                                        "thumb": "thumbs/DSC03632.jpg",
                                        "original": "originals/DSC03632.jpg"
                                },
                                {
                                        "id": "IMG_0406",
                                        "thumb": "thumbs/DSC03642.jpg",
                                        "original": "originals/DSC03642.jpg"
                                },
                                {
                                        "id": "IMG_0407",
                                        "thumb": "thumbs/DSC03654.jpg",
                                        "original": "originals/DSC03654.jpg"
                                },
                                {
                                        "id": "IMG_0408",
                                        "thumb": "thumbs/DSC03660.jpg",
                                        "original": "originals/DSC03660.jpg"
                                },
                                {
                                        "id": "IMG_0409",
                                        "thumb": "thumbs/DSC03662.jpg",
                                        "original": "originals/DSC03662.jpg"
                                },
                                {
                                        "id": "IMG_0410",
                                        "thumb": "thumbs/DSC03663.jpg",
                                        "original": "originals/DSC03663.jpg"
                                },
                                {
                                        "id": "IMG_0411",
                                        "thumb": "thumbs/DSC03665.jpg",
                                        "original": "originals/DSC03665.jpg"
                                },
                                {
                                        "id": "IMG_0412",
                                        "thumb": "thumbs/DSC03669.jpg",
                                        "original": "originals/DSC03669.jpg"
                                },
                                {
                                        "id": "IMG_0413",
                                        "thumb": "thumbs/DSC03672.jpg",
                                        "original": "originals/DSC03672.jpg"
                                },
                                {
                                        "id": "IMG_0414",
                                        "thumb": "thumbs/DSC03674.jpg",
                                        "original": "originals/DSC03674.jpg"
                                },
                                {
                                        "id": "IMG_0415",
                                        "thumb": "thumbs/DSC03680.jpg",
                                        "original": "originals/DSC03680.jpg"
                                },
                                {
                                        "id": "IMG_0416",
                                        "thumb": "thumbs/DSC03682.jpg",
                                        "original": "originals/DSC03682.jpg"
                                },
                                {
                                        "id": "IMG_0417",
                                        "thumb": "thumbs/DSC03686.jpg",
                                        "original": "originals/DSC03686.jpg"
                                },
                                {
                                        "id": "IMG_0418",
                                        "thumb": "thumbs/DSC03693.jpg",
                                        "original": "originals/DSC03693.jpg"
                                },
                                {
                                        "id": "IMG_0419",
                                        "thumb": "thumbs/DSC03694.jpg",
                                        "original": "originals/DSC03694.jpg"
                                },
                                {
                                        "id": "IMG_0420",
                                        "thumb": "thumbs/DSC03706.jpg",
                                        "original": "originals/DSC03706.jpg"
                                },
                                {
                                        "id": "IMG_0421",
                                        "thumb": "thumbs/DSC03707.jpg",
                                        "original": "originals/DSC03707.jpg"
                                },
                                {
                                        "id": "IMG_0422",
                                        "thumb": "thumbs/DSC03715.jpg",
                                        "original": "originals/DSC03715.jpg"
                                },
                                {
                                        "id": "IMG_0423",
                                        "thumb": "thumbs/DSC03716.jpg",
                                        "original": "originals/DSC03716.jpg"
                                },
                                {
                                        "id": "IMG_0424",
                                        "thumb": "thumbs/DSC03721.jpg",
                                        "original": "originals/DSC03721.jpg"
                                },
                                {
                                        "id": "IMG_0425",
                                        "thumb": "thumbs/DSC03724.jpg",
                                        "original": "originals/DSC03724.jpg"
                                },
                                {
                                        "id": "IMG_0426",
                                        "thumb": "thumbs/DSC03726.jpg",
                                        "original": "originals/DSC03726.jpg"
                                },
                                {
                                        "id": "IMG_0427",
                                        "thumb": "thumbs/DSC03728.jpg",
                                        "original": "originals/DSC03728.jpg"
                                },
                                {
                                        "id": "IMG_0428",
                                        "thumb": "thumbs/DSC03731.jpg",
                                        "original": "originals/DSC03731.jpg"
                                },
                                {
                                        "id": "IMG_0429",
                                        "thumb": "thumbs/DSC03735.jpg",
                                        "original": "originals/DSC03735.jpg"
                                },
                                {
                                        "id": "IMG_0430",
                                        "thumb": "thumbs/DSC03737.jpg",
                                        "original": "originals/DSC03737.jpg"
                                },
                                {
                                        "id": "IMG_0431",
                                        "thumb": "thumbs/DSC03744.jpg",
                                        "original": "originals/DSC03744.jpg"
                                },
                                {
                                        "id": "IMG_0432",
                                        "thumb": "thumbs/DSC03748.jpg",
                                        "original": "originals/DSC03748.jpg"
                                },
                                {
                                        "id": "IMG_0433",
                                        "thumb": "thumbs/DSC03750.jpg",
                                        "original": "originals/DSC03750.jpg"
                                },
                                {
                                        "id": "IMG_0434",
                                        "thumb": "thumbs/DSC03760.jpg",
                                        "original": "originals/DSC03760.jpg"
                                },
                                {
                                        "id": "IMG_0435",
                                        "thumb": "thumbs/DSC03761.jpg",
                                        "original": "originals/DSC03761.jpg"
                                },
                                {
                                        "id": "IMG_0436",
                                        "thumb": "thumbs/DSC03765.jpg",
                                        "original": "originals/DSC03765.jpg"
                                },
                                {
                                        "id": "IMG_0437",
                                        "thumb": "thumbs/DSC03767.jpg",
                                        "original": "originals/DSC03767.jpg"
                                },
                                {
                                        "id": "IMG_0438",
                                        "thumb": "thumbs/DSC03780.jpg",
                                        "original": "originals/DSC03780.jpg"
                                },
                                {
                                        "id": "IMG_0439",
                                        "thumb": "thumbs/DSC03787.jpg",
                                        "original": "originals/DSC03787.jpg"
                                },
                                {
                                        "id": "IMG_0440",
                                        "thumb": "thumbs/DSC03791.jpg",
                                        "original": "originals/DSC03791.jpg"
                                },
                                {
                                        "id": "IMG_0441",
                                        "thumb": "thumbs/DSC03798.jpg",
                                        "original": "originals/DSC03798.jpg"
                                },
                                {
                                        "id": "IMG_0442",
                                        "thumb": "thumbs/DSC03803.jpg",
                                        "original": "originals/DSC03803.jpg"
                                },
                                {
                                        "id": "IMG_0443",
                                        "thumb": "thumbs/DSC03804.jpg",
                                        "original": "originals/DSC03804.jpg"
                                },
                                {
                                        "id": "IMG_0444",
                                        "thumb": "thumbs/DSC03815.jpg",
                                        "original": "originals/DSC03815.jpg"
                                },
                                {
                                        "id": "IMG_0445",
                                        "thumb": "thumbs/DSC03817.jpg",
                                        "original": "originals/DSC03817.jpg"
                                },
                                {
                                        "id": "IMG_0446",
                                        "thumb": "thumbs/DSC03821.jpg",
                                        "original": "originals/DSC03821.jpg"
                                },
                                {
                                        "id": "IMG_0447",
                                        "thumb": "thumbs/DSC03824.jpg",
                                        "original": "originals/DSC03824.jpg"
                                },
                                {
                                        "id": "IMG_0448",
                                        "thumb": "thumbs/DSC03827.jpg",
                                        "original": "originals/DSC03827.jpg"
                                },
                                {
                                        "id": "IMG_0449",
                                        "thumb": "thumbs/DSC03828.jpg",
                                        "original": "originals/DSC03828.jpg"
                                },
                                {
                                        "id": "IMG_0450",
                                        "thumb": "thumbs/DSC03833.jpg",
                                        "original": "originals/DSC03833.jpg"
                                },
                                {
                                        "id": "IMG_0451",
                                        "thumb": "thumbs/DSC03838.jpg",
                                        "original": "originals/DSC03838.jpg"
                                },
                                {
                                        "id": "IMG_0452",
                                        "thumb": "thumbs/DSC03849.jpg",
                                        "original": "originals/DSC03849.jpg"
                                },
                                {
                                        "id": "IMG_0453",
                                        "thumb": "thumbs/DSC03862.jpg",
                                        "original": "originals/DSC03862.jpg"
                                },
                                {
                                        "id": "IMG_0454",
                                        "thumb": "thumbs/DSC03863.jpg",
                                        "original": "originals/DSC03863.jpg"
                                },
                                {
                                        "id": "IMG_0455",
                                        "thumb": "thumbs/DSC03865.jpg",
                                        "original": "originals/DSC03865.jpg"
                                },
                                {
                                        "id": "IMG_0456",
                                        "thumb": "thumbs/DSC03878.jpg",
                                        "original": "originals/DSC03878.jpg"
                                },
                                {
                                        "id": "IMG_0457",
                                        "thumb": "thumbs/DSC03882.jpg",
                                        "original": "originals/DSC03882.jpg"
                                },
                                {
                                        "id": "IMG_0458",
                                        "thumb": "thumbs/DSC03892.jpg",
                                        "original": "originals/DSC03892.jpg"
                                },
                                {
                                        "id": "IMG_0459",
                                        "thumb": "thumbs/DSC03899.jpg",
                                        "original": "originals/DSC03899.jpg"
                                },
                                {
                                        "id": "IMG_0460",
                                        "thumb": "thumbs/DSC03922.jpg",
                                        "original": "originals/DSC03922.jpg"
                                },
                                {
                                        "id": "IMG_0461",
                                        "thumb": "thumbs/DSC03944.jpg",
                                        "original": "originals/DSC03944.jpg"
                                },
                                {
                                        "id": "IMG_0462",
                                        "thumb": "thumbs/DSC03951.jpg",
                                        "original": "originals/DSC03951.jpg"
                                },
                                {
                                        "id": "IMG_0463",
                                        "thumb": "thumbs/DSC03964.jpg",
                                        "original": "originals/DSC03964.jpg"
                                },
                                {
                                        "id": "IMG_0464",
                                        "thumb": "thumbs/DSC03966.jpg",
                                        "original": "originals/DSC03966.jpg"
                                },
                                {
                                        "id": "IMG_0465",
                                        "thumb": "thumbs/DSC03973.jpg",
                                        "original": "originals/DSC03973.jpg"
                                },
                                {
                                        "id": "IMG_0466",
                                        "thumb": "thumbs/DSC03976.jpg",
                                        "original": "originals/DSC03976.jpg"
                                },
                                {
                                        "id": "IMG_0467",
                                        "thumb": "thumbs/DSC03979.jpg",
                                        "original": "originals/DSC03979.jpg"
                                },
                                {
                                        "id": "IMG_0468",
                                        "thumb": "thumbs/DSC03991.jpg",
                                        "original": "originals/DSC03991.jpg"
                                },
                                {
                                        "id": "IMG_0469",
                                        "thumb": "thumbs/DSC03997.jpg",
                                        "original": "originals/DSC03997.jpg"
                                },
                                {
                                        "id": "IMG_0470",
                                        "thumb": "thumbs/DSC04000.jpg",
                                        "original": "originals/DSC04000.jpg"
                                },
                                {
                                        "id": "IMG_0471",
                                        "thumb": "thumbs/DSC04007.jpg",
                                        "original": "originals/DSC04007.jpg"
                                },
                                {
                                        "id": "IMG_0472",
                                        "thumb": "thumbs/DSC04014.jpg",
                                        "original": "originals/DSC04014.jpg"
                                },
                                {
                                        "id": "IMG_0473",
                                        "thumb": "thumbs/DSC04015.jpg",
                                        "original": "originals/DSC04015.jpg"
                                },
                                {
                                        "id": "IMG_0474",
                                        "thumb": "thumbs/DSC04017.jpg",
                                        "original": "originals/DSC04017.jpg"
                                },
                                {
                                        "id": "IMG_0475",
                                        "thumb": "thumbs/DSC04024.jpg",
                                        "original": "originals/DSC04024.jpg"
                                },
                                {
                                        "id": "IMG_0476",
                                        "thumb": "thumbs/DSC04029.jpg",
                                        "original": "originals/DSC04029.jpg"
                                },
                                {
                                        "id": "IMG_0477",
                                        "thumb": "thumbs/DSC04032.jpg",
                                        "original": "originals/DSC04032.jpg"
                                },
                                {
                                        "id": "IMG_0478",
                                        "thumb": "thumbs/DSC04034.jpg",
                                        "original": "originals/DSC04034.jpg"
                                },
                                {
                                        "id": "IMG_0479",
                                        "thumb": "thumbs/DSC04037.jpg",
                                        "original": "originals/DSC04037.jpg"
                                },
                                {
                                        "id": "IMG_0480",
                                        "thumb": "thumbs/DSC04048.jpg",
                                        "original": "originals/DSC04048.jpg"
                                },
                                {
                                        "id": "IMG_0481",
                                        "thumb": "thumbs/DSC04051.jpg",
                                        "original": "originals/DSC04051.jpg"
                                },
                                {
                                        "id": "IMG_0482",
                                        "thumb": "thumbs/DSC04058.jpg",
                                        "original": "originals/DSC04058.jpg"
                                },
                                {
                                        "id": "IMG_0483",
                                        "thumb": "thumbs/DSC04059.jpg",
                                        "original": "originals/DSC04059.jpg"
                                },
                                {
                                        "id": "IMG_0484",
                                        "thumb": "thumbs/DSC04061.jpg",
                                        "original": "originals/DSC04061.jpg"
                                },
                                {
                                        "id": "IMG_0485",
                                        "thumb": "thumbs/DSC04068.jpg",
                                        "original": "originals/DSC04068.jpg"
                                },
                                {
                                        "id": "IMG_0486",
                                        "thumb": "thumbs/DSC04076.jpg",
                                        "original": "originals/DSC04076.jpg"
                                },
                                {
                                        "id": "IMG_0487",
                                        "thumb": "thumbs/DSC04083.jpg",
                                        "original": "originals/DSC04083.jpg"
                                },
                                {
                                        "id": "IMG_0488",
                                        "thumb": "thumbs/DSC04088.jpg",
                                        "original": "originals/DSC04088.jpg"
                                },
                                {
                                        "id": "IMG_0489",
                                        "thumb": "thumbs/DSC04091.jpg",
                                        "original": "originals/DSC04091.jpg"
                                },
                                {
                                        "id": "IMG_0490",
                                        "thumb": "thumbs/DSC04095.jpg",
                                        "original": "originals/DSC04095.jpg"
                                },
                                {
                                        "id": "IMG_0491",
                                        "thumb": "thumbs/DSC04107.jpg",
                                        "original": "originals/DSC04107.jpg"
                                },
                                {
                                        "id": "IMG_0492",
                                        "thumb": "thumbs/DSC04110.jpg",
                                        "original": "originals/DSC04110.jpg"
                                },
                                {
                                        "id": "IMG_0493",
                                        "thumb": "thumbs/DSC04112.jpg",
                                        "original": "originals/DSC04112.jpg"
                                },
                                {
                                        "id": "IMG_0494",
                                        "thumb": "thumbs/DSC04118.jpg",
                                        "original": "originals/DSC04118.jpg"
                                },
                                {
                                        "id": "IMG_0495",
                                        "thumb": "thumbs/DSC04132.jpg",
                                        "original": "originals/DSC04132.jpg"
                                },
                                {
                                        "id": "IMG_0496",
                                        "thumb": "thumbs/DSC04135.jpg",
                                        "original": "originals/DSC04135.jpg"
                                },
                                {
                                        "id": "IMG_0497",
                                        "thumb": "thumbs/DSC04137.jpg",
                                        "original": "originals/DSC04137.jpg"
                                },
                                {
                                        "id": "IMG_0498",
                                        "thumb": "thumbs/DSC04141.jpg",
                                        "original": "originals/DSC04141.jpg"
                                },
                                {
                                        "id": "IMG_0499",
                                        "thumb": "thumbs/DSC04149.jpg",
                                        "original": "originals/DSC04149.jpg"
                                },
                                {
                                        "id": "IMG_0500",
                                        "thumb": "thumbs/DSC04159.jpg",
                                        "original": "originals/DSC04159.jpg"
                                },
                                {
                                        "id": "IMG_0501",
                                        "thumb": "thumbs/DSC04165.jpg",
                                        "original": "originals/DSC04165.jpg"
                                },
                                {
                                        "id": "IMG_0502",
                                        "thumb": "thumbs/DSC04171.jpg",
                                        "original": "originals/DSC04171.jpg"
                                },
                                {
                                        "id": "IMG_0503",
                                        "thumb": "thumbs/DSC04175.jpg",
                                        "original": "originals/DSC04175.jpg"
                                },
                                {
                                        "id": "IMG_0504",
                                        "thumb": "thumbs/DSC04186.jpg",
                                        "original": "originals/DSC04186.jpg"
                                },
                                {
                                        "id": "IMG_0505",
                                        "thumb": "thumbs/DSC04196.jpg",
                                        "original": "originals/DSC04196.jpg"
                                },
                                {
                                        "id": "IMG_0506",
                                        "thumb": "thumbs/DSC04198.jpg",
                                        "original": "originals/DSC04198.jpg"
                                },
                                {
                                        "id": "IMG_0507",
                                        "thumb": "thumbs/DSC04200.jpg",
                                        "original": "originals/DSC04200.jpg"
                                },
                                {
                                        "id": "IMG_0508",
                                        "thumb": "thumbs/DSC04212.jpg",
                                        "original": "originals/DSC04212.jpg"
                                },
                                {
                                        "id": "IMG_0509",
                                        "thumb": "thumbs/DSC04213.jpg",
                                        "original": "originals/DSC04213.jpg"
                                },
                                {
                                        "id": "IMG_0510",
                                        "thumb": "thumbs/DSC04216.jpg",
                                        "original": "originals/DSC04216.jpg"
                                },
                                {
                                        "id": "IMG_0511",
                                        "thumb": "thumbs/DSC04221.jpg",
                                        "original": "originals/DSC04221.jpg"
                                },
                                {
                                        "id": "IMG_0512",
                                        "thumb": "thumbs/DSC04223.jpg",
                                        "original": "originals/DSC04223.jpg"
                                },
                                {
                                        "id": "IMG_0513",
                                        "thumb": "thumbs/DSC04224.jpg",
                                        "original": "originals/DSC04224.jpg"
                                },
                                {
                                        "id": "IMG_0514",
                                        "thumb": "thumbs/DSC04227.jpg",
                                        "original": "originals/DSC04227.jpg"
                                },
                                {
                                        "id": "IMG_0515",
                                        "thumb": "thumbs/DSC04238.jpg",
                                        "original": "originals/DSC04238.jpg"
                                },
                                {
                                        "id": "IMG_0516",
                                        "thumb": "thumbs/DSC04239.jpg",
                                        "original": "originals/DSC04239.jpg"
                                },
                                {
                                        "id": "IMG_0517",
                                        "thumb": "thumbs/DSC04243.jpg",
                                        "original": "originals/DSC04243.jpg"
                                },
                                {
                                        "id": "IMG_0518",
                                        "thumb": "thumbs/DSC04247.jpg",
                                        "original": "originals/DSC04247.jpg"
                                },
                                {
                                        "id": "IMG_0519",
                                        "thumb": "thumbs/DSC04250.jpg",
                                        "original": "originals/DSC04250.jpg"
                                },
                                {
                                        "id": "IMG_0520",
                                        "thumb": "thumbs/DSC04251.jpg",
                                        "original": "originals/DSC04251.jpg"
                                },
                                {
                                        "id": "IMG_0521",
                                        "thumb": "thumbs/DSC04255.jpg",
                                        "original": "originals/DSC04255.jpg"
                                },
                                {
                                        "id": "IMG_0522",
                                        "thumb": "thumbs/DSC04261.jpg",
                                        "original": "originals/DSC04261.jpg"
                                },
                                {
                                        "id": "IMG_0523",
                                        "thumb": "thumbs/DSC04264.jpg",
                                        "original": "originals/DSC04264.jpg"
                                },
                                {
                                        "id": "IMG_0524",
                                        "thumb": "thumbs/DSC04268.jpg",
                                        "original": "originals/DSC04268.jpg"
                                },
                                {
                                        "id": "IMG_0525",
                                        "thumb": "thumbs/DSC04271.jpg",
                                        "original": "originals/DSC04271.jpg"
                                },
                                {
                                        "id": "IMG_0526",
                                        "thumb": "thumbs/DSC04273.jpg",
                                        "original": "originals/DSC04273.jpg"
                                },
                                {
                                        "id": "IMG_0527",
                                        "thumb": "thumbs/DSC04274.jpg",
                                        "original": "originals/DSC04274.jpg"
                                },
                                {
                                        "id": "IMG_0528",
                                        "thumb": "thumbs/DSC04275.jpg",
                                        "original": "originals/DSC04275.jpg"
                                },
                                {
                                        "id": "IMG_0529",
                                        "thumb": "thumbs/DSC04276.jpg",
                                        "original": "originals/DSC04276.jpg"
                                },
                                {
                                        "id": "IMG_0530",
                                        "thumb": "thumbs/DSC04287.jpg",
                                        "original": "originals/DSC04287.jpg"
                                },
                                {
                                        "id": "IMG_0531",
                                        "thumb": "thumbs/DSC04293.jpg",
                                        "original": "originals/DSC04293.jpg"
                                },
                                {
                                        "id": "IMG_0532",
                                        "thumb": "thumbs/DSC04296.jpg",
                                        "original": "originals/DSC04296.jpg"
                                },
                                {
                                        "id": "IMG_0533",
                                        "thumb": "thumbs/DSC04297.jpg",
                                        "original": "originals/DSC04297.jpg"
                                },
                                {
                                        "id": "IMG_0534",
                                        "thumb": "thumbs/DSC04301.jpg",
                                        "original": "originals/DSC04301.jpg"
                                },
                                {
                                        "id": "IMG_0535",
                                        "thumb": "thumbs/DSC04303.jpg",
                                        "original": "originals/DSC04303.jpg"
                                },
                                {
                                        "id": "IMG_0536",
                                        "thumb": "thumbs/DSC04304.jpg",
                                        "original": "originals/DSC04304.jpg"
                                },
                                {
                                        "id": "IMG_0537",
                                        "thumb": "thumbs/DSC04306.jpg",
                                        "original": "originals/DSC04306.jpg"
                                },
                                {
                                        "id": "IMG_0538",
                                        "thumb": "thumbs/DSC04307.jpg",
                                        "original": "originals/DSC04307.jpg"
                                },
                                {
                                        "id": "IMG_0539",
                                        "thumb": "thumbs/DSC04309.jpg",
                                        "original": "originals/DSC04309.jpg"
                                },
                                {
                                        "id": "IMG_0540",
                                        "thumb": "thumbs/DSC04312.jpg",
                                        "original": "originals/DSC04312.jpg"
                                },
                                {
                                        "id": "IMG_0541",
                                        "thumb": "thumbs/DSC04314.jpg",
                                        "original": "originals/DSC04314.jpg"
                                },
                                {
                                        "id": "IMG_0542",
                                        "thumb": "thumbs/DSC04315.jpg",
                                        "original": "originals/DSC04315.jpg"
                                },
                                {
                                        "id": "IMG_0543",
                                        "thumb": "thumbs/DSC04317.jpg",
                                        "original": "originals/DSC04317.jpg"
                                },
                                {
                                        "id": "IMG_0544",
                                        "thumb": "thumbs/DSC04319.jpg",
                                        "original": "originals/DSC04319.jpg"
                                },
                                {
                                        "id": "IMG_0545",
                                        "thumb": "thumbs/DSC04322.jpg",
                                        "original": "originals/DSC04322.jpg"
                                },
                                {
                                        "id": "IMG_0546",
                                        "thumb": "thumbs/DSC04335.jpg",
                                        "original": "originals/DSC04335.jpg"
                                },
                                {
                                        "id": "IMG_0547",
                                        "thumb": "thumbs/DSC04342.jpg",
                                        "original": "originals/DSC04342.jpg"
                                },
                                {
                                        "id": "IMG_0548",
                                        "thumb": "thumbs/DSC04347.jpg",
                                        "original": "originals/DSC04347.jpg"
                                },
                                {
                                        "id": "IMG_0549",
                                        "thumb": "thumbs/DSC04351.jpg",
                                        "original": "originals/DSC04351.jpg"
                                },
                                {
                                        "id": "IMG_0550",
                                        "thumb": "thumbs/DSC04356.jpg",
                                        "original": "originals/DSC04356.jpg"
                                },
                                {
                                        "id": "IMG_0551",
                                        "thumb": "thumbs/DSC04357.jpg",
                                        "original": "originals/DSC04357.jpg"
                                },
                                {
                                        "id": "IMG_0552",
                                        "thumb": "thumbs/DSC04359.jpg",
                                        "original": "originals/DSC04359.jpg"
                                },
                                {
                                        "id": "IMG_0553",
                                        "thumb": "thumbs/DSC04361.jpg",
                                        "original": "originals/DSC04361.jpg"
                                },
                                {
                                        "id": "IMG_0554",
                                        "thumb": "thumbs/DSC04367.jpg",
                                        "original": "originals/DSC04367.jpg"
                                },
                                {
                                        "id": "IMG_0555",
                                        "thumb": "thumbs/DSC04368.jpg",
                                        "original": "originals/DSC04368.jpg"
                                },
                                {
                                        "id": "IMG_0556",
                                        "thumb": "thumbs/DSC04372.jpg",
                                        "original": "originals/DSC04372.jpg"
                                },
                                {
                                        "id": "IMG_0557",
                                        "thumb": "thumbs/DSC04377.jpg",
                                        "original": "originals/DSC04377.jpg"
                                },
                                {
                                        "id": "IMG_0558",
                                        "thumb": "thumbs/DSC04382.jpg",
                                        "original": "originals/DSC04382.jpg"
                                },
                                {
                                        "id": "IMG_0559",
                                        "thumb": "thumbs/DSC04383.jpg",
                                        "original": "originals/DSC04383.jpg"
                                },
                                {
                                        "id": "IMG_0560",
                                        "thumb": "thumbs/DSC04384.jpg",
                                        "original": "originals/DSC04384.jpg"
                                },
                                {
                                        "id": "IMG_0561",
                                        "thumb": "thumbs/DSC04432.jpg",
                                        "original": "originals/DSC04432.jpg"
                                },
                                {
                                        "id": "IMG_0562",
                                        "thumb": "thumbs/DSC04433.jpg",
                                        "original": "originals/DSC04433.jpg"
                                },
                                {
                                        "id": "IMG_0563",
                                        "thumb": "thumbs/DSC04436.jpg",
                                        "original": "originals/DSC04436.jpg"
                                },
                                {
                                        "id": "IMG_0564",
                                        "thumb": "thumbs/DSC04439.jpg",
                                        "original": "originals/DSC04439.jpg"
                                },
                                {
                                        "id": "IMG_0565",
                                        "thumb": "thumbs/DSC04441.jpg",
                                        "original": "originals/DSC04441.jpg"
                                },
                                {
                                        "id": "IMG_0566",
                                        "thumb": "thumbs/DSC04443.jpg",
                                        "original": "originals/DSC04443.jpg"
                                },
                                {
                                        "id": "IMG_0567",
                                        "thumb": "thumbs/DSC04444.jpg",
                                        "original": "originals/DSC04444.jpg"
                                },
                                {
                                        "id": "IMG_0568",
                                        "thumb": "thumbs/DSC04447.jpg",
                                        "original": "originals/DSC04447.jpg"
                                },
                                {
                                        "id": "IMG_0569",
                                        "thumb": "thumbs/DSC04448.jpg",
                                        "original": "originals/DSC04448.jpg"
                                },
                                {
                                        "id": "IMG_0570",
                                        "thumb": "thumbs/DSC04450.jpg",
                                        "original": "originals/DSC04450.jpg"
                                },
                                {
                                        "id": "IMG_0571",
                                        "thumb": "thumbs/DSC04455.jpg",
                                        "original": "originals/DSC04455.jpg"
                                },
                                {
                                        "id": "IMG_0572",
                                        "thumb": "thumbs/DSC04457.jpg",
                                        "original": "originals/DSC04457.jpg"
                                },
                                {
                                        "id": "IMG_0573",
                                        "thumb": "thumbs/DSC04459.jpg",
                                        "original": "originals/DSC04459.jpg"
                                },
                                {
                                        "id": "IMG_0574",
                                        "thumb": "thumbs/DSC04463.jpg",
                                        "original": "originals/DSC04463.jpg"
                                },
                                {
                                        "id": "IMG_0575",
                                        "thumb": "thumbs/DSC04466.jpg",
                                        "original": "originals/DSC04466.jpg"
                                },
                                {
                                        "id": "IMG_0576",
                                        "thumb": "thumbs/DSC04467.jpg",
                                        "original": "originals/DSC04467.jpg"
                                },
                                {
                                        "id": "IMG_0577",
                                        "thumb": "thumbs/DSC04471.jpg",
                                        "original": "originals/DSC04471.jpg"
                                },
                                {
                                        "id": "IMG_0578",
                                        "thumb": "thumbs/DSC04474.jpg",
                                        "original": "originals/DSC04474.jpg"
                                },
                                {
                                        "id": "IMG_0579",
                                        "thumb": "thumbs/DSC04477.jpg",
                                        "original": "originals/DSC04477.jpg"
                                },
                                {
                                        "id": "IMG_0580",
                                        "thumb": "thumbs/DSC04481.jpg",
                                        "original": "originals/DSC04481.jpg"
                                },
                                {
                                        "id": "IMG_0581",
                                        "thumb": "thumbs/DSC04485.jpg",
                                        "original": "originals/DSC04485.jpg"
                                },
                                {
                                        "id": "IMG_0582",
                                        "thumb": "thumbs/DSC04488.jpg",
                                        "original": "originals/DSC04488.jpg"
                                },
                                {
                                        "id": "IMG_0583",
                                        "thumb": "thumbs/DSC04496.jpg",
                                        "original": "originals/DSC04496.jpg"
                                },
                                {
                                        "id": "IMG_0584",
                                        "thumb": "thumbs/DSC04504.jpg",
                                        "original": "originals/DSC04504.jpg"
                                },
                                {
                                        "id": "IMG_0585",
                                        "thumb": "thumbs/DSC04509.jpg",
                                        "original": "originals/DSC04509.jpg"
                                },
                                {
                                        "id": "IMG_0586",
                                        "thumb": "thumbs/DSC04514.jpg",
                                        "original": "originals/DSC04514.jpg"
                                },
                                {
                                        "id": "IMG_0587",
                                        "thumb": "thumbs/DSC04523.jpg",
                                        "original": "originals/DSC04523.jpg"
                                },
                                {
                                        "id": "IMG_0588",
                                        "thumb": "thumbs/DSC04527.jpg",
                                        "original": "originals/DSC04527.jpg"
                                },
                                {
                                        "id": "IMG_0589",
                                        "thumb": "thumbs/DSC04532.jpg",
                                        "original": "originals/DSC04532.jpg"
                                },
                                {
                                        "id": "IMG_0590",
                                        "thumb": "thumbs/DSC04533.jpg",
                                        "original": "originals/DSC04533.jpg"
                                },
                                {
                                        "id": "IMG_0591",
                                        "thumb": "thumbs/DSC04538.jpg",
                                        "original": "originals/DSC04538.jpg"
                                },
                                {
                                        "id": "IMG_0592",
                                        "thumb": "thumbs/DSC04548.jpg",
                                        "original": "originals/DSC04548.jpg"
                                },
                                {
                                        "id": "IMG_0593",
                                        "thumb": "thumbs/DSC04562.jpg",
                                        "original": "originals/DSC04562.jpg"
                                },
                                {
                                        "id": "IMG_0594",
                                        "thumb": "thumbs/DSC04568.jpg",
                                        "original": "originals/DSC04568.jpg"
                                },
                                {
                                        "id": "IMG_0595",
                                        "thumb": "thumbs/DSC04571.jpg",
                                        "original": "originals/DSC04571.jpg"
                                },
                                {
                                        "id": "IMG_0596",
                                        "thumb": "thumbs/DSC04584.jpg",
                                        "original": "originals/DSC04584.jpg"
                                },
                                {
                                        "id": "IMG_0597",
                                        "thumb": "thumbs/DSC04587.jpg",
                                        "original": "originals/DSC04587.jpg"
                                },
                                {
                                        "id": "IMG_0598",
                                        "thumb": "thumbs/DSC04589.jpg",
                                        "original": "originals/DSC04589.jpg"
                                },
                                {
                                        "id": "IMG_0599",
                                        "thumb": "thumbs/DSC04595.jpg",
                                        "original": "originals/DSC04595.jpg"
                                },
                                {
                                        "id": "IMG_0600",
                                        "thumb": "thumbs/DSC04599.jpg",
                                        "original": "originals/DSC04599.jpg"
                                },
                                {
                                        "id": "IMG_0601",
                                        "thumb": "thumbs/DSC04604.jpg",
                                        "original": "originals/DSC04604.jpg"
                                },
                                {
                                        "id": "IMG_0602",
                                        "thumb": "thumbs/DSC04614.jpg",
                                        "original": "originals/DSC04614.jpg"
                                },
                                {
                                        "id": "IMG_0603",
                                        "thumb": "thumbs/DSC04616.jpg",
                                        "original": "originals/DSC04616.jpg"
                                },
                                {
                                        "id": "IMG_0604",
                                        "thumb": "thumbs/DSC04622.jpg",
                                        "original": "originals/DSC04622.jpg"
                                },
                                {
                                        "id": "IMG_0605",
                                        "thumb": "thumbs/DSC04628.jpg",
                                        "original": "originals/DSC04628.jpg"
                                },
                                {
                                        "id": "IMG_0606",
                                        "thumb": "thumbs/DSC04639.jpg",
                                        "original": "originals/DSC04639.jpg"
                                },
                                {
                                        "id": "IMG_0607",
                                        "thumb": "thumbs/DSC04642.jpg",
                                        "original": "originals/DSC04642.jpg"
                                },
                                {
                                        "id": "IMG_0608",
                                        "thumb": "thumbs/DSC04650.jpg",
                                        "original": "originals/DSC04650.jpg"
                                },
                                {
                                        "id": "IMG_0609",
                                        "thumb": "thumbs/DSC04653.jpg",
                                        "original": "originals/DSC04653.jpg"
                                },
                                {
                                        "id": "IMG_0610",
                                        "thumb": "thumbs/DSC04654.jpg",
                                        "original": "originals/DSC04654.jpg"
                                },
                                {
                                        "id": "IMG_0611",
                                        "thumb": "thumbs/DSC04656.jpg",
                                        "original": "originals/DSC04656.jpg"
                                },
                                {
                                        "id": "IMG_0612",
                                        "thumb": "thumbs/DSC04658.jpg",
                                        "original": "originals/DSC04658.jpg"
                                },
                                {
                                        "id": "IMG_0613",
                                        "thumb": "thumbs/DSC04661.jpg",
                                        "original": "originals/DSC04661.jpg"
                                },
                                {
                                        "id": "IMG_0614",
                                        "thumb": "thumbs/DSC04666.jpg",
                                        "original": "originals/DSC04666.jpg"
                                },
                                {
                                        "id": "IMG_0615",
                                        "thumb": "thumbs/DSC04671.jpg",
                                        "original": "originals/DSC04671.jpg"
                                },
                                {
                                        "id": "IMG_0616",
                                        "thumb": "thumbs/DSC04677.jpg",
                                        "original": "originals/DSC04677.jpg"
                                },
                                {
                                        "id": "IMG_0617",
                                        "thumb": "thumbs/DSC04686.jpg",
                                        "original": "originals/DSC04686.jpg"
                                },
                                {
                                        "id": "IMG_0618",
                                        "thumb": "thumbs/DSC04691.jpg",
                                        "original": "originals/DSC04691.jpg"
                                },
                                {
                                        "id": "IMG_0619",
                                        "thumb": "thumbs/DSC04699.jpg",
                                        "original": "originals/DSC04699.jpg"
                                },
                                {
                                        "id": "IMG_0620",
                                        "thumb": "thumbs/DSC04707.jpg",
                                        "original": "originals/DSC04707.jpg"
                                },
                                {
                                        "id": "IMG_0621",
                                        "thumb": "thumbs/DSC04710.jpg",
                                        "original": "originals/DSC04710.jpg"
                                },
                                {
                                        "id": "IMG_0622",
                                        "thumb": "thumbs/DSC04718.jpg",
                                        "original": "originals/DSC04718.jpg"
                                },
                                {
                                        "id": "IMG_0623",
                                        "thumb": "thumbs/DSC04724.jpg",
                                        "original": "originals/DSC04724.jpg"
                                },
                                {
                                        "id": "IMG_0624",
                                        "thumb": "thumbs/DSC04728.jpg",
                                        "original": "originals/DSC04728.jpg"
                                },
                                {
                                        "id": "IMG_0625",
                                        "thumb": "thumbs/DSC04736.jpg",
                                        "original": "originals/DSC04736.jpg"
                                },
                                {
                                        "id": "IMG_0626",
                                        "thumb": "thumbs/DSC04742.jpg",
                                        "original": "originals/DSC04742.jpg"
                                },
                                {
                                        "id": "IMG_0627",
                                        "thumb": "thumbs/DSC04749.jpg",
                                        "original": "originals/DSC04749.jpg"
                                },
                                {
                                        "id": "IMG_0628",
                                        "thumb": "thumbs/DSC04760.jpg",
                                        "original": "originals/DSC04760.jpg"
                                },
                                {
                                        "id": "IMG_0629",
                                        "thumb": "thumbs/DSC04764.jpg",
                                        "original": "originals/DSC04764.jpg"
                                },
                                {
                                        "id": "IMG_0630",
                                        "thumb": "thumbs/DSC04774.jpg",
                                        "original": "originals/DSC04774.jpg"
                                },
                                {
                                        "id": "IMG_0631",
                                        "thumb": "thumbs/DSC04779.jpg",
                                        "original": "originals/DSC04779.jpg"
                                },
                                {
                                        "id": "IMG_0632",
                                        "thumb": "thumbs/DSC04782.jpg",
                                        "original": "originals/DSC04782.jpg"
                                },
                                {
                                        "id": "IMG_0633",
                                        "thumb": "thumbs/DSC04791.jpg",
                                        "original": "originals/DSC04791.jpg"
                                },
                                {
                                        "id": "IMG_0634",
                                        "thumb": "thumbs/DSC04797.jpg",
                                        "original": "originals/DSC04797.jpg"
                                },
                                {
                                        "id": "IMG_0635",
                                        "thumb": "thumbs/DSC04800.jpg",
                                        "original": "originals/DSC04800.jpg"
                                },
                                {
                                        "id": "IMG_0636",
                                        "thumb": "thumbs/DSC04810.jpg",
                                        "original": "originals/DSC04810.jpg"
                                },
                                {
                                        "id": "IMG_0637",
                                        "thumb": "thumbs/DSC04813.jpg",
                                        "original": "originals/DSC04813.jpg"
                                },
                                {
                                        "id": "IMG_0638",
                                        "thumb": "thumbs/DSC04815.jpg",
                                        "original": "originals/DSC04815.jpg"
                                },
                                {
                                        "id": "IMG_0639",
                                        "thumb": "thumbs/DSC04825.jpg",
                                        "original": "originals/DSC04825.jpg"
                                },
                                {
                                        "id": "IMG_0640",
                                        "thumb": "thumbs/DSC04833.jpg",
                                        "original": "originals/DSC04833.jpg"
                                },
                                {
                                        "id": "IMG_0641",
                                        "thumb": "thumbs/DSC04837.jpg",
                                        "original": "originals/DSC04837.jpg"
                                },
                                {
                                        "id": "IMG_0642",
                                        "thumb": "thumbs/DSC04851.jpg",
                                        "original": "originals/DSC04851.jpg"
                                },
                                {
                                        "id": "IMG_0643",
                                        "thumb": "thumbs/DSC04857.jpg",
                                        "original": "originals/DSC04857.jpg"
                                },
                                {
                                        "id": "IMG_0644",
                                        "thumb": "thumbs/DSC04862.jpg",
                                        "original": "originals/DSC04862.jpg"
                                },
                                {
                                        "id": "IMG_0645",
                                        "thumb": "thumbs/DSC04875.jpg",
                                        "original": "originals/DSC04875.jpg"
                                },
                                {
                                        "id": "IMG_0646",
                                        "thumb": "thumbs/DSC04881.jpg",
                                        "original": "originals/DSC04881.jpg"
                                },
                                {
                                        "id": "IMG_0647",
                                        "thumb": "thumbs/DSC04883.jpg",
                                        "original": "originals/DSC04883.jpg"
                                },
                                {
                                        "id": "IMG_0648",
                                        "thumb": "thumbs/DSC04887.jpg",
                                        "original": "originals/DSC04887.jpg"
                                },
                                {
                                        "id": "IMG_0649",
                                        "thumb": "thumbs/DSC04897.jpg",
                                        "original": "originals/DSC04897.jpg"
                                },
                                {
                                        "id": "IMG_0650",
                                        "thumb": "thumbs/DSC04910.jpg",
                                        "original": "originals/DSC04910.jpg"
                                },
                                {
                                        "id": "IMG_0651",
                                        "thumb": "thumbs/DSC04911.jpg",
                                        "original": "originals/DSC04911.jpg"
                                },
                                {
                                        "id": "IMG_0652",
                                        "thumb": "thumbs/DSC04916.jpg",
                                        "original": "originals/DSC04916.jpg"
                                },
                                {
                                        "id": "IMG_0653",
                                        "thumb": "thumbs/DSC04925.jpg",
                                        "original": "originals/DSC04925.jpg"
                                },
                                {
                                        "id": "IMG_0654",
                                        "thumb": "thumbs/DSC04932.jpg",
                                        "original": "originals/DSC04932.jpg"
                                },
                                {
                                        "id": "IMG_0655",
                                        "thumb": "thumbs/DSC04937.jpg",
                                        "original": "originals/DSC04937.jpg"
                                },
                                {
                                        "id": "IMG_0656",
                                        "thumb": "thumbs/DSC04939.jpg",
                                        "original": "originals/DSC04939.jpg"
                                },
                                {
                                        "id": "IMG_0657",
                                        "thumb": "thumbs/DSC04947.jpg",
                                        "original": "originals/DSC04947.jpg"
                                },
                                {
                                        "id": "IMG_0658",
                                        "thumb": "thumbs/DSC04950.jpg",
                                        "original": "originals/DSC04950.jpg"
                                },
                                {
                                        "id": "IMG_0659",
                                        "thumb": "thumbs/DSC04952.jpg",
                                        "original": "originals/DSC04952.jpg"
                                },
                                {
                                        "id": "IMG_0660",
                                        "thumb": "thumbs/DSC04961.jpg",
                                        "original": "originals/DSC04961.jpg"
                                },
                                {
                                        "id": "IMG_0661",
                                        "thumb": "thumbs/DSC04964.jpg",
                                        "original": "originals/DSC04964.jpg"
                                },
                                {
                                        "id": "IMG_0662",
                                        "thumb": "thumbs/DSC04969.jpg",
                                        "original": "originals/DSC04969.jpg"
                                },
                                {
                                        "id": "IMG_0663",
                                        "thumb": "thumbs/DSC04975.jpg",
                                        "original": "originals/DSC04975.jpg"
                                },
                                {
                                        "id": "IMG_0664",
                                        "thumb": "thumbs/DSC04980.jpg",
                                        "original": "originals/DSC04980.jpg"
                                },
                                {
                                        "id": "IMG_0665",
                                        "thumb": "thumbs/DSC04986.jpg",
                                        "original": "originals/DSC04986.jpg"
                                },
                                {
                                        "id": "IMG_0666",
                                        "thumb": "thumbs/DSC04996.jpg",
                                        "original": "originals/DSC04996.jpg"
                                },
                                {
                                        "id": "IMG_0667",
                                        "thumb": "thumbs/DSC04997.jpg",
                                        "original": "originals/DSC04997.jpg"
                                },
                                {
                                        "id": "IMG_0668",
                                        "thumb": "thumbs/DSC05002.jpg",
                                        "original": "originals/DSC05002.jpg"
                                },
                                {
                                        "id": "IMG_0669",
                                        "thumb": "thumbs/DSC05004.jpg",
                                        "original": "originals/DSC05004.jpg"
                                },
                                {
                                        "id": "IMG_0670",
                                        "thumb": "thumbs/DSC05009.jpg",
                                        "original": "originals/DSC05009.jpg"
                                },
                                {
                                        "id": "IMG_0671",
                                        "thumb": "thumbs/DSC05013.jpg",
                                        "original": "originals/DSC05013.jpg"
                                },
                                {
                                        "id": "IMG_0672",
                                        "thumb": "thumbs/DSC05017.jpg",
                                        "original": "originals/DSC05017.jpg"
                                },
                                {
                                        "id": "IMG_0673",
                                        "thumb": "thumbs/DSC05020.jpg",
                                        "original": "originals/DSC05020.jpg"
                                },
                                {
                                        "id": "IMG_0674",
                                        "thumb": "thumbs/DSC05027.jpg",
                                        "original": "originals/DSC05027.jpg"
                                },
                                {
                                        "id": "IMG_0675",
                                        "thumb": "thumbs/DSC05029.jpg",
                                        "original": "originals/DSC05029.jpg"
                                },
                                {
                                        "id": "IMG_0676",
                                        "thumb": "thumbs/DSC05030.jpg",
                                        "original": "originals/DSC05030.jpg"
                                },
                                {
                                        "id": "IMG_0677",
                                        "thumb": "thumbs/DSC05040.jpg",
                                        "original": "originals/DSC05040.jpg"
                                },
                                {
                                        "id": "IMG_0678",
                                        "thumb": "thumbs/DSC05048.jpg",
                                        "original": "originals/DSC05048.jpg"
                                },
                                {
                                        "id": "IMG_0679",
                                        "thumb": "thumbs/DSC05052.jpg",
                                        "original": "originals/DSC05052.jpg"
                                },
                                {
                                        "id": "IMG_0680",
                                        "thumb": "thumbs/DSC05055.jpg",
                                        "original": "originals/DSC05055.jpg"
                                },
                                {
                                        "id": "IMG_0681",
                                        "thumb": "thumbs/DSC05058.jpg",
                                        "original": "originals/DSC05058.jpg"
                                },
                                {
                                        "id": "IMG_0682",
                                        "thumb": "thumbs/DSC05065.jpg",
                                        "original": "originals/DSC05065.jpg"
                                },
                                {
                                        "id": "IMG_0683",
                                        "thumb": "thumbs/DSC05073.jpg",
                                        "original": "originals/DSC05073.jpg"
                                },
                                {
                                        "id": "IMG_0684",
                                        "thumb": "thumbs/DSC05078.jpg",
                                        "original": "originals/DSC05078.jpg"
                                },
                                {
                                        "id": "IMG_0685",
                                        "thumb": "thumbs/DSC05089.jpg",
                                        "original": "originals/DSC05089.jpg"
                                },
                                {
                                        "id": "IMG_0686",
                                        "thumb": "thumbs/DSC05099.jpg",
                                        "original": "originals/DSC05099.jpg"
                                },
                                {
                                        "id": "IMG_0687",
                                        "thumb": "thumbs/DSC05112.jpg",
                                        "original": "originals/DSC05112.jpg"
                                },
                                {
                                        "id": "IMG_0688",
                                        "thumb": "thumbs/DSC05115.jpg",
                                        "original": "originals/DSC05115.jpg"
                                },
                                {
                                        "id": "IMG_0689",
                                        "thumb": "thumbs/DSC05120.jpg",
                                        "original": "originals/DSC05120.jpg"
                                },
                                {
                                        "id": "IMG_0690",
                                        "thumb": "thumbs/DSC05123.jpg",
                                        "original": "originals/DSC05123.jpg"
                                },
                                {
                                        "id": "IMG_0691",
                                        "thumb": "thumbs/DSC05126.jpg",
                                        "original": "originals/DSC05126.jpg"
                                },
                                {
                                        "id": "IMG_0692",
                                        "thumb": "thumbs/DSC05133.jpg",
                                        "original": "originals/DSC05133.jpg"
                                },
                                {
                                        "id": "IMG_0693",
                                        "thumb": "thumbs/DSC05136.jpg",
                                        "original": "originals/DSC05136.jpg"
                                },
                                {
                                        "id": "IMG_0694",
                                        "thumb": "thumbs/DSC05145.jpg",
                                        "original": "originals/DSC05145.jpg"
                                },
                                {
                                        "id": "IMG_0695",
                                        "thumb": "thumbs/DSC05150.jpg",
                                        "original": "originals/DSC05150.jpg"
                                },
                                {
                                        "id": "IMG_0696",
                                        "thumb": "thumbs/DSC05152.jpg",
                                        "original": "originals/DSC05152.jpg"
                                },
                                {
                                        "id": "IMG_0697",
                                        "thumb": "thumbs/DSC05157.jpg",
                                        "original": "originals/DSC05157.jpg"
                                },
                                {
                                        "id": "IMG_0698",
                                        "thumb": "thumbs/DSC05160.jpg",
                                        "original": "originals/DSC05160.jpg"
                                },
                                {
                                        "id": "IMG_0699",
                                        "thumb": "thumbs/DSC05168.jpg",
                                        "original": "originals/DSC05168.jpg"
                                },
                                {
                                        "id": "IMG_0700",
                                        "thumb": "thumbs/DSC05172.jpg",
                                        "original": "originals/DSC05172.jpg"
                                },
                                {
                                        "id": "IMG_0701",
                                        "thumb": "thumbs/DSC05174.jpg",
                                        "original": "originals/DSC05174.jpg"
                                },
                                {
                                        "id": "IMG_0702",
                                        "thumb": "thumbs/DSC05178.jpg",
                                        "original": "originals/DSC05178.jpg"
                                },
                                {
                                        "id": "IMG_0703",
                                        "thumb": "thumbs/DSC05181.jpg",
                                        "original": "originals/DSC05181.jpg"
                                },
                                {
                                        "id": "IMG_0704",
                                        "thumb": "thumbs/DSC05185.jpg",
                                        "original": "originals/DSC05185.jpg"
                                },
                                {
                                        "id": "IMG_0705",
                                        "thumb": "thumbs/DSC05187.jpg",
                                        "original": "originals/DSC05187.jpg"
                                },
                                {
                                        "id": "IMG_0706",
                                        "thumb": "thumbs/DSC05189.jpg",
                                        "original": "originals/DSC05189.jpg"
                                },
                                {
                                        "id": "IMG_0707",
                                        "thumb": "thumbs/DSC05193.jpg",
                                        "original": "originals/DSC05193.jpg"
                                },
                                {
                                        "id": "IMG_0708",
                                        "thumb": "thumbs/DSC05195.jpg",
                                        "original": "originals/DSC05195.jpg"
                                },
                                {
                                        "id": "IMG_0709",
                                        "thumb": "thumbs/DSC05198.jpg",
                                        "original": "originals/DSC05198.jpg"
                                },
                                {
                                        "id": "IMG_0710",
                                        "thumb": "thumbs/DSC05201.jpg",
                                        "original": "originals/DSC05201.jpg"
                                },
                                {
                                        "id": "IMG_0711",
                                        "thumb": "thumbs/DSC05212.jpg",
                                        "original": "originals/DSC05212.jpg"
                                },
                                {
                                        "id": "IMG_0712",
                                        "thumb": "thumbs/DSC05216.jpg",
                                        "original": "originals/DSC05216.jpg"
                                },
                                {
                                        "id": "IMG_0713",
                                        "thumb": "thumbs/DSC05220.jpg",
                                        "original": "originals/DSC05220.jpg"
                                },
                                {
                                        "id": "IMG_0714",
                                        "thumb": "thumbs/DSC05227.jpg",
                                        "original": "originals/DSC05227.jpg"
                                },
                                {
                                        "id": "IMG_0715",
                                        "thumb": "thumbs/DSC05231.jpg",
                                        "original": "originals/DSC05231.jpg"
                                },
                                {
                                        "id": "IMG_0716",
                                        "thumb": "thumbs/DSC05238.jpg",
                                        "original": "originals/DSC05238.jpg"
                                },
                                {
                                        "id": "IMG_0717",
                                        "thumb": "thumbs/DSC05240.jpg",
                                        "original": "originals/DSC05240.jpg"
                                },
                                {
                                        "id": "IMG_0718",
                                        "thumb": "thumbs/DSC05252.jpg",
                                        "original": "originals/DSC05252.jpg"
                                },
                                {
                                        "id": "IMG_0719",
                                        "thumb": "thumbs/DSC05255.jpg",
                                        "original": "originals/DSC05255.jpg"
                                },
                                {
                                        "id": "IMG_0720",
                                        "thumb": "thumbs/DSC05261.jpg",
                                        "original": "originals/DSC05261.jpg"
                                },
                                {
                                        "id": "IMG_0721",
                                        "thumb": "thumbs/DSC05265.jpg",
                                        "original": "originals/DSC05265.jpg"
                                },
                                {
                                        "id": "IMG_0722",
                                        "thumb": "thumbs/DSC05273.jpg",
                                        "original": "originals/DSC05273.jpg"
                                },
                                {
                                        "id": "IMG_0723",
                                        "thumb": "thumbs/DSC05275.jpg",
                                        "original": "originals/DSC05275.jpg"
                                },
                                {
                                        "id": "IMG_0724",
                                        "thumb": "thumbs/DSC05281.jpg",
                                        "original": "originals/DSC05281.jpg"
                                },
                                {
                                        "id": "IMG_0725",
                                        "thumb": "thumbs/DSC05286.jpg",
                                        "original": "originals/DSC05286.jpg"
                                },
                                {
                                        "id": "IMG_0726",
                                        "thumb": "thumbs/DSC05292.jpg",
                                        "original": "originals/DSC05292.jpg"
                                },
                                {
                                        "id": "IMG_0727",
                                        "thumb": "thumbs/DSC05305.jpg",
                                        "original": "originals/DSC05305.jpg"
                                },
                                {
                                        "id": "IMG_0728",
                                        "thumb": "thumbs/DSC05310.jpg",
                                        "original": "originals/DSC05310.jpg"
                                },
                                {
                                        "id": "IMG_0729",
                                        "thumb": "thumbs/DSC05313.jpg",
                                        "original": "originals/DSC05313.jpg"
                                },
                                {
                                        "id": "IMG_0730",
                                        "thumb": "thumbs/DSC05318.jpg",
                                        "original": "originals/DSC05318.jpg"
                                },
                                {
                                        "id": "IMG_0731",
                                        "thumb": "thumbs/DSC05323.jpg",
                                        "original": "originals/DSC05323.jpg"
                                },
                                {
                                        "id": "IMG_0732",
                                        "thumb": "thumbs/DSC05326.jpg",
                                        "original": "originals/DSC05326.jpg"
                                },
                                {
                                        "id": "IMG_0733",
                                        "thumb": "thumbs/DSC05329.jpg",
                                        "original": "originals/DSC05329.jpg"
                                },
                                {
                                        "id": "IMG_0734",
                                        "thumb": "thumbs/DSC05331.jpg",
                                        "original": "originals/DSC05331.jpg"
                                },
                                {
                                        "id": "IMG_0735",
                                        "thumb": "thumbs/DSC05339.jpg",
                                        "original": "originals/DSC05339.jpg"
                                },
                                {
                                        "id": "IMG_0736",
                                        "thumb": "thumbs/DSC05369.jpg",
                                        "original": "originals/DSC05369.jpg"
                                },
                                {
                                        "id": "IMG_0737",
                                        "thumb": "thumbs/DSC05372.jpg",
                                        "original": "originals/DSC05372.jpg"
                                },
                                {
                                        "id": "IMG_0738",
                                        "thumb": "thumbs/DSC05377.jpg",
                                        "original": "originals/DSC05377.jpg"
                                },
                                {
                                        "id": "IMG_0739",
                                        "thumb": "thumbs/DSC05386.jpg",
                                        "original": "originals/DSC05386.jpg"
                                },
                                {
                                        "id": "IMG_0740",
                                        "thumb": "thumbs/DSC05390.jpg",
                                        "original": "originals/DSC05390.jpg"
                                },
                                {
                                        "id": "IMG_0741",
                                        "thumb": "thumbs/DSC05395.jpg",
                                        "original": "originals/DSC05395.jpg"
                                },
                                {
                                        "id": "IMG_0742",
                                        "thumb": "thumbs/DSC05405.jpg",
                                        "original": "originals/DSC05405.jpg"
                                },
                                {
                                        "id": "IMG_0743",
                                        "thumb": "thumbs/DSC05413.jpg",
                                        "original": "originals/DSC05413.jpg"
                                },
                                {
                                        "id": "IMG_0744",
                                        "thumb": "thumbs/DSC05417.jpg",
                                        "original": "originals/DSC05417.jpg"
                                },
                                {
                                        "id": "IMG_0745",
                                        "thumb": "thumbs/DSC05427.jpg",
                                        "original": "originals/DSC05427.jpg"
                                },
                                {
                                        "id": "IMG_0746",
                                        "thumb": "thumbs/DSC05440.jpg",
                                        "original": "originals/DSC05440.jpg"
                                },
                                {
                                        "id": "IMG_0747",
                                        "thumb": "thumbs/DSC05442.jpg",
                                        "original": "originals/DSC05442.jpg"
                                },
                                {
                                        "id": "IMG_0748",
                                        "thumb": "thumbs/DSC05446.jpg",
                                        "original": "originals/DSC05446.jpg"
                                },
                                {
                                        "id": "IMG_0749",
                                        "thumb": "thumbs/DSC05450.jpg",
                                        "original": "originals/DSC05450.jpg"
                                },
                                {
                                        "id": "IMG_0750",
                                        "thumb": "thumbs/DSC05453.jpg",
                                        "original": "originals/DSC05453.jpg"
                                },
                                {
                                        "id": "IMG_0751",
                                        "thumb": "thumbs/DSC05461.jpg",
                                        "original": "originals/DSC05461.jpg"
                                },
                                {
                                        "id": "IMG_0752",
                                        "thumb": "thumbs/DSC05464.jpg",
                                        "original": "originals/DSC05464.jpg"
                                },
                                {
                                        "id": "IMG_0753",
                                        "thumb": "thumbs/DSC05471.jpg",
                                        "original": "originals/DSC05471.jpg"
                                },
                                {
                                        "id": "IMG_0754",
                                        "thumb": "thumbs/DSC05476.jpg",
                                        "original": "originals/DSC05476.jpg"
                                },
                                {
                                        "id": "IMG_0755",
                                        "thumb": "thumbs/DSC05482.jpg",
                                        "original": "originals/DSC05482.jpg"
                                },
                                {
                                        "id": "IMG_0756",
                                        "thumb": "thumbs/DSC05486.jpg",
                                        "original": "originals/DSC05486.jpg"
                                },
                                {
                                        "id": "IMG_0757",
                                        "thumb": "thumbs/DSC05499.jpg",
                                        "original": "originals/DSC05499.jpg"
                                },
                                {
                                        "id": "IMG_0758",
                                        "thumb": "thumbs/DSC05502.jpg",
                                        "original": "originals/DSC05502.jpg"
                                },
                                {
                                        "id": "IMG_0759",
                                        "thumb": "thumbs/DSC05505.jpg",
                                        "original": "originals/DSC05505.jpg"
                                },
                                {
                                        "id": "IMG_0760",
                                        "thumb": "thumbs/DSC05508.jpg",
                                        "original": "originals/DSC05508.jpg"
                                },
                                {
                                        "id": "IMG_0761",
                                        "thumb": "thumbs/DSC05510.jpg",
                                        "original": "originals/DSC05510.jpg"
                                },
                                {
                                        "id": "IMG_0762",
                                        "thumb": "thumbs/DSC05512.jpg",
                                        "original": "originals/DSC05512.jpg"
                                },
                                {
                                        "id": "IMG_0763",
                                        "thumb": "thumbs/DSC05515.jpg",
                                        "original": "originals/DSC05515.jpg"
                                },
                                {
                                        "id": "IMG_0764",
                                        "thumb": "thumbs/DSC05519.jpg",
                                        "original": "originals/DSC05519.jpg"
                                },
                                {
                                        "id": "IMG_0765",
                                        "thumb": "thumbs/DSC05525.jpg",
                                        "original": "originals/DSC05525.jpg"
                                },
                                {
                                        "id": "IMG_0766",
                                        "thumb": "thumbs/DSC05526.jpg",
                                        "original": "originals/DSC05526.jpg"
                                },
                                {
                                        "id": "IMG_0767",
                                        "thumb": "thumbs/DSC05529.jpg",
                                        "original": "originals/DSC05529.jpg"
                                },
                                {
                                        "id": "IMG_0768",
                                        "thumb": "thumbs/DSC05533.jpg",
                                        "original": "originals/DSC05533.jpg"
                                },
                                {
                                        "id": "IMG_0769",
                                        "thumb": "thumbs/DSC05537.jpg",
                                        "original": "originals/DSC05537.jpg"
                                },
                                {
                                        "id": "IMG_0770",
                                        "thumb": "thumbs/DSC05538.jpg",
                                        "original": "originals/DSC05538.jpg"
                                },
                                {
                                        "id": "IMG_0771",
                                        "thumb": "thumbs/DSC05545.jpg",
                                        "original": "originals/DSC05545.jpg"
                                },
                                {
                                        "id": "IMG_0772",
                                        "thumb": "thumbs/DSC05547.jpg",
                                        "original": "originals/DSC05547.jpg"
                                },
                                {
                                        "id": "IMG_0773",
                                        "thumb": "thumbs/DSC05549.jpg",
                                        "original": "originals/DSC05549.jpg"
                                },
                                {
                                        "id": "IMG_0774",
                                        "thumb": "thumbs/DSC05552.jpg",
                                        "original": "originals/DSC05552.jpg"
                                },
                                {
                                        "id": "IMG_0775",
                                        "thumb": "thumbs/DSC05555.jpg",
                                        "original": "originals/DSC05555.jpg"
                                },
                                {
                                        "id": "IMG_0776",
                                        "thumb": "thumbs/DSC05557.jpg",
                                        "original": "originals/DSC05557.jpg"
                                },
                                {
                                        "id": "IMG_0777",
                                        "thumb": "thumbs/DSC05559.jpg",
                                        "original": "originals/DSC05559.jpg"
                                },
                                {
                                        "id": "IMG_0778",
                                        "thumb": "thumbs/DSC05561.jpg",
                                        "original": "originals/DSC05561.jpg"
                                },
                                {
                                        "id": "IMG_0779",
                                        "thumb": "thumbs/DSC05562.jpg",
                                        "original": "originals/DSC05562.jpg"
                                },
                                {
                                        "id": "IMG_0780",
                                        "thumb": "thumbs/DSC05565.jpg",
                                        "original": "originals/DSC05565.jpg"
                                },
                                {
                                        "id": "IMG_0781",
                                        "thumb": "thumbs/DSC05566.jpg",
                                        "original": "originals/DSC05566.jpg"
                                },
                                {
                                        "id": "IMG_0782",
                                        "thumb": "thumbs/DSC05568.jpg",
                                        "original": "originals/DSC05568.jpg"
                                },
                                {
                                        "id": "IMG_0783",
                                        "thumb": "thumbs/DSC05570.jpg",
                                        "original": "originals/DSC05570.jpg"
                                }
                        ]
                }
        ]
};

    // --- PRODUCTS CATALOG ---
    const PRODUCTS = [
        // Kategori 1: Klasik Baskılar
        { id: 'baski-10x15', category: 'baski', categoryLabel: 'Klasik Baskılar', name: 'Standart Baskı (10×15)', price: 0, mockup: { shape: 'print', wRatio: 1.5, hRatio: 1, padding: 5, bgColor: '#fff', frameColor: '#eee' } },
        { id: 'baski-13x18', category: 'baski', categoryLabel: 'Klasik Baskılar', name: 'Orta Baskı (13×18)', price: 0, mockup: { shape: 'print', wRatio: 1.4, hRatio: 1, padding: 5, bgColor: '#fff', frameColor: '#eee' } },
        { id: 'baski-15x21', category: 'baski', categoryLabel: 'Klasik Baskılar', name: 'A5 Baskı (15×21)', price: 0, mockup: { shape: 'print', wRatio: 1, hRatio: 1.4, padding: 5, bgColor: '#fff', frameColor: '#eee' } },
        { id: 'baski-20x30', category: 'baski', categoryLabel: 'Klasik Baskılar', name: 'A4 Baskı (20×30)', price: 0, mockup: { shape: 'print', wRatio: 1, hRatio: 1.5, padding: 5, bgColor: '#fff', frameColor: '#eee' } },
        
        // Kategori 2: Duvar Sanatı
        { id: 'kanvas-30x40', category: 'duvar', categoryLabel: 'Duvar Sanatı', name: 'Kanvas Tablo (30×40)', price: 0, mockup: { shape: 'canvas', wRatio: 3, hRatio: 4, padding: 0, frameColor: '#ccc' } },
        { id: 'kanvas-50x70', category: 'duvar', categoryLabel: 'Duvar Sanatı', name: 'Kanvas Tablo (50×70)', price: 0, mockup: { shape: 'canvas', wRatio: 5, hRatio: 7, padding: 0, frameColor: '#ccc' } },
        { id: 'cerceve-21x30', category: 'duvar', categoryLabel: 'Duvar Sanatı', name: 'Ahşap Çerçeveli (21×30)', price: 0, mockup: { shape: 'rect', wRatio: 2.1, hRatio: 3, padding: 10, bgColor: '#fff', frameColor: '#8b5a2b' } },
        { id: 'mdf-blok', category: 'duvar', categoryLabel: 'Duvar Sanatı', name: 'MDF Blok Baskı', price: 0, mockup: { shape: 'mdf', wRatio: 1, hRatio: 1.2, padding: 0, frameColor: '#444' } },

        // Kategori 3: Hediyelik
        { id: 'kupa', category: 'hediye', categoryLabel: 'Hediyelik', name: 'Fotoğraflı Kupa', price: 0, mockup: { shape: 'mug', wRatio: 1, hRatio: 1.2, bgColor: '#fff' } },
        { id: 'sihirli-kupa', category: 'hediye', categoryLabel: 'Hediyelik', name: 'Sihirli Kupa', price: 0, mockup: { shape: 'mug', wRatio: 1, hRatio: 1.2, bgColor: '#333' } },
        { id: 'magnet', category: 'hediye', categoryLabel: 'Hediyelik', name: 'Buzdolabı Magneti', price: 0, mockup: { shape: 'magnet', wRatio: 1, hRatio: 1.4, padding: 2, bgColor: '#fff', frameColor: '#ddd' } },
        { id: 'anahtarlik', category: 'hediye', categoryLabel: 'Hediyelik', name: 'Akrilik Anahtarlık', price: 0, mockup: { shape: 'keychain', wRatio: 1, hRatio: 1, padding: 2, frameColor: '#ccc' } },
        { id: 'puzzle', category: 'hediye', categoryLabel: 'Hediyelik', name: 'Fotoğraflı Yapboz', price: 0, mockup: { shape: 'puzzle', wRatio: 4, hRatio: 3, padding: 0 } },

        // Kategori 4: Kırtasiye & Paketler
        { id: 'takvim', category: 'kirtasiye', categoryLabel: 'Paketler', name: 'Masa Takvimi', price: 0, mockup: { shape: 'calendar', wRatio: 1.5, hRatio: 1, bgColor: '#fff' } },
        { id: 'kitap-ayraci', category: 'kirtasiye', categoryLabel: 'Paketler', name: 'Kitap Ayracı', price: 0, mockup: { shape: 'bookmark', wRatio: 1, hRatio: 3, padding: 2, bgColor: '#fff' } },
        { id: 'paket-aile', category: 'kirtasiye', categoryLabel: 'Paketler', name: 'Aile Paketi', price: 0, mockup: { shape: 'bundle', text: 'Aile Paketi' } },
        { id: 'paket-buyukanne', category: 'kirtasiye', categoryLabel: 'Paketler', name: 'Büyükanne Paketi', price: 0, mockup: { shape: 'bundle', text: 'Büyükanne Pkt.' } }
    ];

    const CAT_ICONS = {
        baski: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:5px;vertical-align:-2px;"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>',
        duvar: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:5px;vertical-align:-2px;"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>',
        hediye: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:5px;vertical-align:-2px;"><polyline points="20 12 20 22 4 22 4 12"></polyline><rect x="2" y="7" width="20" height="5"></rect><line x1="12" y1="22" x2="12" y2="7"></line><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path></svg>',
        kirtasiye: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:5px;vertical-align:-2px;"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>'
    };

    // ── State ──
    let currentSchool = null;
    let currentRole = null;       // 'veli' | 'admin'
    let selectedPhotos = new Set();
    let gLightboxInstance = null;
    let activeLightboxPhotoId = null;
    let activeLightboxPhotoUrl = null;
    let activeLightboxThumbUrl = null;

    // ── Helpers ──
    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => document.querySelectorAll(sel);

    function showToast(msg, type = '') {
        const c = document.getElementById('toastContainer');
        if (!c) return;
        const t = document.createElement('div');
        t.className = `toast ${type}`;
        t.textContent = msg;
        c.appendChild(t);
        setTimeout(() => t.remove(), 3200);
    }

    function showView(id) {
        $$('.view-panel').forEach(p => p.classList.remove('active'));
        const el = document.getElementById(id);
        if (el) el.classList.add('active');
    }

    // ==========================================
    // MODULE 1: AuthGate
    // ==========================================
    const AuthGate = {
        selectedRole: 'veli',

        init() {
            const urlParams = new URLSearchParams(window.location.search);
            const schoolSlug = urlParams.get('okul') || window.location.hash.replace('#','') || null;

            // Try fetch first, fall back to inline config (for file:// protocol)
            const loadConfig = async () => {
                try {
                    const r = await fetch('teslimat-config.json');
                    return await r.json();
                } catch (e) {
                    console.warn('Config fetch failed, using inline config:', e.message);
                    return JSON.parse(JSON.stringify(INLINE_CONFIG));
                }
            };

            loadConfig().then(data => {
                // Tek okul varsa otomatik seç (okul seçim ekranını atla)
                if (!schoolSlug && data.schools.length === 1) {
                    currentSchool = data.schools[0];
                    AdminData.load();
                    document.getElementById('authSchoolName').textContent = currentSchool.name;
                    this.setupListeners();
                    return;
                }

                if (!schoolSlug) {
                    this.showSchoolSelector(data.schools);
                    return;
                }
                
                const school = data.schools.find(s => s.slug === schoolSlug);
                if (!school) {
                    this.showError('Okul bulunamadı: ' + schoolSlug);
                    return;
                }
                currentSchool = school;

                // Apply admin mods from localStorage
                AdminData.load();

                document.getElementById('authSchoolName').textContent = school.name;
                this.setupListeners();
            }).catch(err => this.showError(err.message));
        },

        showError(msg) {
            const main = document.getElementById('teslimatMain');
            main.innerHTML = `<div class="container" style="padding-top:150px;text-align:center;"><h2>Hata</h2><p>${msg}</p></div>`;
            main.classList.remove('hidden');
            document.getElementById('teslimatAuth').classList.add('hidden');
        },

        showSchoolSelector(schools) {
            const auth = document.getElementById('teslimatAuth');
            let html = `<div class="auth-box" style="text-align:center;max-width:500px;margin: 50px auto;">
                <div class="auth-icon" style="font-size:48px;margin-bottom:15px;">🏫</div>
                <h1 class="auth-title">Kayıtlı Okullar</h1>
                <p class="auth-subtitle" style="margin-bottom:30px;">Sisteme kayıtlı okullardan birini seçin.</p>
                <div style="display:flex;flex-direction:column;gap:15px;">
            `;
            
            if (schools.length === 0) {
                html += `<p style="color:var(--text-light);">Henüz kayıtlı okul bulunmuyor.</p>`;
            } else {
                schools.forEach(s => {
                    html += `<a href="?okul=${s.slug}" style="text-decoration:none;display:flex;justify-content:space-between;align-items:center;padding:18px 24px;background:#f8f9fc;color:var(--text-color);border:2px solid #eef0f6;border-radius:12px;transition:0.2s;" onmouseover="this.style.borderColor='var(--bento-blue)'" onmouseout="this.style.borderColor='#eef0f6'">
                        <strong style="font-size:18px;">${s.name}</strong>
                        <span style="font-size:24px;">→</span>
                    </a>`;
                });
            }
            html += `</div></div>`;
            auth.innerHTML = html;
        },

        setupListeners() {
            // Role cards
            $$('.role-card').forEach(card => {
                card.addEventListener('click', () => {
                    $$('.role-card').forEach(c => c.classList.remove('active'));
                    card.classList.add('active');
                    this.selectedRole = card.dataset.role;

                    const pinField = document.getElementById('authPinInput');
                    const passField = document.getElementById('authPassInput');
                    if (this.selectedRole === 'admin') {
                        pinField.style.display = 'none';
                        passField.style.display = 'block';
                        passField.focus();
                    } else {
                        pinField.style.display = 'block';
                        passField.style.display = 'none';
                        pinField.focus();
                    }
                });
            });

            // Submit
            document.getElementById('authSubmitBtn').addEventListener('click', () => this.submit());

            // Enter key
            document.getElementById('authPinInput').addEventListener('keypress', e => {
                if (e.key === 'Enter') this.submit();
            });
            document.getElementById('authPassInput').addEventListener('keypress', e => {
                if (e.key === 'Enter') this.submit();
            });
        },

        async submit() {
            const errEl = document.getElementById('authError');
            errEl.style.display = 'none';

            if (this.selectedRole === 'veli') {
                const pin = document.getElementById('authPinInput').value;
                if (await pinMatch(pin, currentSchool.veliPin)) {
                    currentRole = 'veli';
                    document.getElementById('teslimatAuth').classList.add('hidden');
                    document.getElementById('teslimatMain').classList.remove('hidden');
                    document.title = `${currentSchool.name} Fotoğraflar | KPS`;
                    PhotoViewer.open();
                } else {
                    errEl.textContent = 'Hatalı PIN, lütfen tekrar deneyin.';
                    errEl.style.display = 'block';
                }
            } else {
                const pass = document.getElementById('authPassInput').value;
                if (await pinMatch(pass, currentSchool.adminPin)) {
                    currentRole = 'admin';
                    document.getElementById('teslimatAuth').classList.add('hidden');
                    document.getElementById('teslimatMain').classList.remove('hidden');
                    document.title = `Admin — ${currentSchool.name} | KPS`;
                    AdminPanel.render();
                } else {
                    errEl.textContent = 'Hatalı şifre, lütfen tekrar deneyin.';
                    errEl.style.display = 'block';
                }
            }
        }
    };

    // ==========================================
    // MODULE 2: AdminData (localStorage persistence)
    // ==========================================
    const AdminData = {
        getKey() { return `kps_admin_${currentSchool.slug}`; },

        load() {
            const saved = localStorage.getItem(this.getKey());
            if (!saved) return;
            try {
                const mods = JSON.parse(saved);
                if (mods.veliPin) currentSchool.veliPin = mods.veliPin;
                if (mods.adminPin) currentSchool.adminPin = mods.adminPin;
            } catch (e) { /* ignore */ }
        },

        save() {
            const mods = { 
                veliPin: currentSchool.veliPin,
                adminPin: currentSchool.adminPin
            };
            localStorage.setItem(this.getKey(), JSON.stringify(mods));
        }
    };

    let isSelectMode = false;

    // ==========================================
    // MODULE 3: PhotoViewer
    // ==========================================
    const PhotoViewer = {
        open() {
            selectedPhotos.clear();
            isSelectMode = false;
            PriceManager.load();
            showView('photoViewPanel');
            this.updateBreadcrumb();
            this.renderToolbar();
            this.renderPhotos();
        },

        updateBreadcrumb() {
            document.getElementById('breadcrumb').innerHTML = `
                <a id="bcFolders" style="cursor:pointer;">📷 ${currentSchool.name} Fotoğrafları</a>
            `;
            document.getElementById('bcFolders').addEventListener('click', () => {
                if (currentRole === 'admin') AdminPanel.render();
            });
        },

        renderToolbar() {
            const toolbar = document.getElementById('photosToolbar');
            if(toolbar) {
                toolbar.innerHTML = `
                    <div class="toolbar-left">
                        <button class="btn-back" id="photosBackBtn" style="display:${currentRole === 'admin' ? 'inline-flex' : 'none'};">← Admin</button>
                        <h2 style="font-size:20px; font-family:'Outfit',sans-serif;">${currentSchool.name}</h2>
                        <span style="color:var(--text-light);font-size:13px;font-weight:600;">${currentSchool.photos.length} fotoğraf</span>
                    </div>
                    <div class="toolbar-right">
                        <button class="btn-ghost" id="downloadAllBtn" style="font-size:12px;padding:7px 14px; margin-right: 6px;">Tümünü İndir</button>
                        <button class="btn-ghost" id="toggleSelectModeBtn" style="font-size:12px;padding:7px 14px; font-weight:bold;">Seç</button>
                        <button class="btn-ghost" id="selectAllPhotosBtn" style="font-size:12px;padding:7px 14px; display:none;">Tümünü Seç</button>
                    </div>
                `;

                document.getElementById('photosBackBtn').addEventListener('click', () => {
                    if (currentRole === 'admin') AdminPanel.render();
                });

                const toggleBtn = document.getElementById('toggleSelectModeBtn');
                const selectAllBtn = document.getElementById('selectAllPhotosBtn');

                toggleBtn.addEventListener('click', () => {
                    isSelectMode = !isSelectMode;
                    if (isSelectMode) {
                        toggleBtn.textContent = 'Vazgeç';
                        toggleBtn.style.color = '#e74c3c';
                        selectAllBtn.style.display = 'inline-block';
                        document.body.classList.add('select-mode-active');
                    } else {
                        toggleBtn.textContent = 'Seç';
                        toggleBtn.style.color = '';
                        selectAllBtn.style.display = 'none';
                        selectedPhotos.clear();
                        $$('.photo-card-t').forEach(c => c.classList.remove('selected'));
                        document.body.classList.remove('select-mode-active');
                        this.updateButtons();
                    }
                });

                selectAllBtn.addEventListener('click', (e) => {
                    const allSelected = selectedPhotos.size === currentSchool.photos.length;
                    if (allSelected) {
                        selectedPhotos.clear();
                        $$('.photo-card-t').forEach(c => c.classList.remove('selected'));
                        e.target.textContent = 'Tümünü Seç';
                    } else {
                        currentSchool.photos.forEach(p => selectedPhotos.add(p.id));
                        $$('.photo-card-t').forEach(c => c.classList.add('selected'));
                        e.target.textContent = 'Seçimi Temizle';
                    }
                    this.updateButtons();
                });
                
                const downloadAllBtn = document.getElementById('downloadAllBtn');
                downloadAllBtn.addEventListener('click', () => {
                    selectedPhotos.clear();
                    currentSchool.photos.forEach(p => selectedPhotos.add(p.id));
                    Downloader.downloadSelected();
                    selectedPhotos.clear();
                });
            }
            
            // Re-bind download button in the new action bar
            const dlBtn = document.getElementById('downloadBtn');
            if(dlBtn) {
                // Remove old listeners by cloning
                const newDlBtn = dlBtn.cloneNode(true);
                dlBtn.parentNode.replaceChild(newDlBtn, dlBtn);
                newDlBtn.addEventListener('click', () => Downloader.downloadSelected());
            }
        },

        renderPhotos() {
            const grid = document.getElementById('photoGridT');
            let html = '';
            currentSchool.photos.forEach(photo => {
                const thumbUrl = PHOTO_BASE_URL + currentSchool.basePath + photo.thumb;
                html += `
                    <div class="photo-card-t ${selectedPhotos.has(photo.id) ? 'selected' : ''}" data-photo-id="${photo.id}">
                        <img src="${thumbUrl}" loading="lazy" alt="Fotoğraf">
                        <div class="photo-overlay-t">
                            <div class="photo-check"></div>
                            <div class="photo-actions-t">
                                <button class="photo-btn-t btn-view-photo" title="Büyüt">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            });
            grid.innerHTML = html;

            // Click handlers + image load
            grid.querySelectorAll('.photo-card-t').forEach(card => {
                // Shimmer → loaded transition
                const img = card.querySelector('img');
                if (img) {
                    img.addEventListener('load', () => card.classList.add('loaded'));
                    if (img.complete) card.classList.add('loaded');
                }

                card.addEventListener('click', (e) => {
                    if (e.target.closest('.btn-view-photo')) return;
                    const pid = card.dataset.photoId;
                    if (isSelectMode) {
                        if (selectedPhotos.has(pid)) {
                            selectedPhotos.delete(pid);
                            card.classList.remove('selected');
                        } else {
                            selectedPhotos.add(pid);
                            card.classList.add('selected');
                        }
                        this.updateButtons();
                    } else {
                        this.openLightbox(pid);
                    }
                });

                card.querySelector('.btn-view-photo').addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.openLightbox(card.dataset.photoId);
                });
            });
        },

        updateButtons() {
            const count = selectedPhotos.size;
            
            // Bottom Action Bar Logic
            const bar = document.getElementById('actionBar');
            const countEl = document.getElementById('selectedCount');
            if (countEl) countEl.textContent = count;
            
            if (bar) {
                if (count > 0) {
                    bar.classList.remove('hidden');
                } else {
                    bar.classList.add('hidden');
                }
            }

            const selectAllBtn = document.getElementById('selectAllPhotosBtn');
            if (selectAllBtn) {
                selectAllBtn.textContent = (count === currentSchool.photos.length && count > 0) ? 'Seçimi Temizle' : 'Tümünü Seç';
            }
        },

        openLightbox(startPhotoId) {
            const elements = currentSchool.photos.map(p => ({
                href: PHOTO_BASE_URL + currentSchool.basePath + p.thumb, // Use low-res for fast viewing
                type: 'image',
                photoId: p.id,
                originalUrl: PHOTO_BASE_URL + currentSchool.basePath + p.original,
                thumbUrl: PHOTO_BASE_URL + currentSchool.basePath + p.thumb
            }));
            const startIndex = currentSchool.photos.findIndex(p => p.id === startPhotoId);

            if (gLightboxInstance) gLightboxInstance.destroy();
            
            const firstSlide = elements[startIndex];
            activeLightboxPhotoId = firstSlide.photoId;
            activeLightboxPhotoUrl = firstSlide.originalUrl; // Keep original URL for downloading!
            activeLightboxThumbUrl = firstSlide.thumbUrl;

            gLightboxInstance = GLightbox({
                elements: elements,
                startAt: startIndex,
                touchNavigation: true,
                loop: true
            });
            
            // Add a custom download button to the lightbox toolbar safely
            const injectDownloadBtn = () => {
                if (!document.getElementById('gCustomDownloadBtn')) {
                    const dlBtn = document.createElement('button');
                    dlBtn.id = 'gCustomDownloadBtn';
                    // Sol üst köşe — fotoğrafın ve sidebar'ın altında kalmaz
                    dlBtn.style.cssText = 'position:fixed; bottom:30px; left:50%; transform:translateX(-50%); z-index:2147483647; background:#3b82f6; color:#fff; border:none; padding:12px 28px; border-radius:50px; font-weight:700; cursor:pointer; box-shadow:0 6px 20px rgba(59,130,246,0.5); display:flex; align-items:center; gap:10px; font-size:15px; font-family:Outfit,sans-serif; letter-spacing:0.3px;';
                    dlBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg> İndir`;
                    dlBtn.onclick = async () => {
                        if(!activeLightboxPhotoUrl) return;
                        const filename = activeLightboxPhotoUrl.split('/').pop() || 'fotograf.jpg';
                        dlBtn.innerHTML = 'İniyor...';
                        try {
                            const response = await fetch(activeLightboxPhotoUrl);
                            if(!response.ok) throw new Error("CORS or Network Error");
                            const blob = await response.blob();
                            const a = document.createElement('a');
                            a.href = URL.createObjectURL(blob);
                            a.download = filename;
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                            URL.revokeObjectURL(a.href);
                        } catch(e) {
                            alert("Tarayıcınız güvenlik (CORS) nedeniyle indirmeyi engelledi. Lütfen R2 CORS ayarlarını yapın.");
                        }
                        dlBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg> İndir`;
                    };
                    document.body.appendChild(dlBtn);
                } else {
                    document.getElementById('gCustomDownloadBtn').style.display = 'flex';
                }
            };

            gLightboxInstance.on('open', () => {
                ProductBar.init();
                setTimeout(() => ProductBar.updateMockups(activeLightboxThumbUrl), 100);
                setTimeout(injectDownloadBtn, 300); // Wait for DOM to render
            });
            
            gLightboxInstance.on('slide_changed', ({ current }) => {
                const slide = elements[current.index];
                activeLightboxPhotoId = slide.photoId;
                activeLightboxPhotoUrl = slide.originalUrl;
                activeLightboxThumbUrl = slide.thumbUrl;
                ProductBar.updateMockups(activeLightboxThumbUrl);
                injectDownloadBtn(); // Ensure button stays there
            });
            
            gLightboxInstance.on('close', () => {
                const btn = document.getElementById('gCustomDownloadBtn');
                if (btn) btn.style.display = 'none';
            });
            
            gLightboxInstance.on('close', () => {
                ProductBar.hide();
                document.body.classList.remove('shop-bar-minimized');
            });

            gLightboxInstance.open();
        }
    };

    // ==========================================
    // MODULE 6: AdminPanel (Tabbed) + Helpers
    // ==========================================
    const PriceManager = {
        KEY: () => `kps_prices_${currentSchool.slug}`,
        load() {
            try { const p = JSON.parse(localStorage.getItem(this.KEY())); if(p) PRODUCTS.forEach(pr => { if(p[pr.id]!==undefined) pr.price=p[pr.id]; }); } catch(e){}
        },
        save() { const p={}; PRODUCTS.forEach(pr => p[pr.id]=pr.price); localStorage.setItem(this.KEY(), JSON.stringify(p)); }
    };
    const OrderTracker = {
        KEY: () => `kps_orders_${currentSchool.slug}`,
        getAll() { try { return JSON.parse(localStorage.getItem(this.KEY())||'[]'); } catch(e){ return []; } },
        add(order) { const o=this.getAll(); o.unshift({...order,id:Date.now().toString(),date:new Date().toLocaleString('tr-TR'),status:'Beklemede'}); localStorage.setItem(this.KEY(),JSON.stringify(o)); },
        updateStatus(id,status) { const o=this.getAll(); const x=o.find(i=>i.id===id); if(x){x.status=status; localStorage.setItem(this.KEY(),JSON.stringify(o));} },
        exportCSV() {
            const o=this.getAll(); if(!o.length){showToast('Sipariş yok.','error');return;}
            let csv='Tarih,Ad,Telefon,Adres,Ödeme,Ürünler,Toplam,Durum\n';
            o.forEach(r => csv+=`"${r.date}","${r.name}","${r.phone}","${r.address}","${r.payment}","${r.items}","₺${r.total}","${r.status}"\n`);
            saveAs(new Blob(['\ufeff'+csv],{type:'text/csv;charset=utf-8'}),`${currentSchool.slug}_siparisler.csv`);
        }
    };
    const DownloadTracker = {
        KEY: () => `kps_dl_${currentSchool.slug}`,
        getCount() { const t=new Date().toISOString().split('T')[0]; try{const d=JSON.parse(localStorage.getItem(this.KEY()));return(d&&d.date===t)?d.count:0;}catch(e){return 0;} },
        increment() { const t=new Date().toISOString().split('T')[0],c=this.getCount()+1; localStorage.setItem(this.KEY(),JSON.stringify({date:t,count:c})); return c; },
        getLimit() { return parseInt(localStorage.getItem(`kps_dl_limit_${currentSchool.slug}`)||'0'); },
        setLimit(n) { localStorage.setItem(`kps_dl_limit_${currentSchool.slug}`,n.toString()); },
        canDownload() { const l=this.getLimit(); return l===0||this.getCount()<l; }
    };

    const AdminPanel = {
        activeTab: 'general',
        render() {
            showView('adminViewPanel');
            this.updateBreadcrumb();
            PriceManager.load();
            const c = document.getElementById('adminContent');
            c.innerHTML = `
                <div class="admin-toolbar"><div><h1>🛡️ Admin Paneli</h1><p style="color:var(--text-light);font-size:14px;margin-top:4px;">${currentSchool.name} — ${currentSchool.photos.length} fotoğraf</p></div>
                <button class="btn-action blue" id="viewPhotosBtn">👁️ Fotoğrafları Gör</button></div>
                <div class="admin-tabs" id="adminTabs">
                    <button class="admin-tab active" data-tab="general">⚙️ Genel</button>
                    <button class="admin-tab" data-tab="prices">💰 Fiyatlar</button>
                    <button class="admin-tab" data-tab="orders">📦 Siparişler</button>
                    <button class="admin-tab" data-tab="settings">🔧 Ayarlar</button>
                </div>
                <div class="admin-tab-content" id="adminTabContent"></div>`;
            document.getElementById('viewPhotosBtn').addEventListener('click', () => PhotoViewer.open());
            document.getElementById('adminTabs').addEventListener('click', e => {
                const tab=e.target.closest('.admin-tab'); if(!tab) return;
                c.querySelectorAll('.admin-tab').forEach(t=>t.classList.remove('active'));
                tab.classList.add('active'); this.activeTab=tab.dataset.tab; this.renderTab();
            });
            this.renderTab();
        },
        renderTab() {
            const c=document.getElementById('adminTabContent');
            if(this.activeTab==='general') this.renderGeneral(c);
            else if(this.activeTab==='prices') this.renderPrices(c);
            else if(this.activeTab==='orders') this.renderOrders(c);
            else if(this.activeTab==='settings') this.renderSettings(c);
        },
        renderGeneral(c) {
            c.innerHTML = `<div class="admin-section"><h3>🔐 Giriş Şifreleri</h3>
                <div class="admin-row"><label>Veli PIN</label><input type="text" id="adm_veliPin" value="${currentSchool.veliPin}" class="admin-input"></div>
                <div class="admin-row"><label>Admin Şifre</label><input type="text" id="adm_adminPin" value="${currentSchool.adminPin}" class="admin-input"></div>
                <button class="btn-action" id="admSavePins">💾 Kaydet</button></div>
                <div class="admin-section" style="margin-top:20px;"><h3>📥 Yapılandırma</h3>
                <button class="btn-action" id="admDownloadConfig">⬇️ Ayarları İndir</button></div>`;
            document.getElementById('admSavePins').addEventListener('click', () => {
                currentSchool.veliPin=document.getElementById('adm_veliPin').value.trim();
                currentSchool.adminPin=document.getElementById('adm_adminPin').value.trim();
                AdminData.save(); showToast('Şifreler güncellendi.','success');
            });
            document.getElementById('admDownloadConfig').addEventListener('click', () => this.downloadConfig());
        },
        renderPrices(c) {
            const cats=[...new Set(PRODUCTS.map(p=>p.categoryLabel))];
            let h='<div class="admin-section"><h3>💰 Ürün Fiyatları</h3>';
            cats.forEach(cat => {
                h+=`<div class="price-category"><h4>${cat}</h4>`;
                PRODUCTS.filter(p=>p.categoryLabel===cat).forEach(p => {
                    h+=`<div class="price-row"><span>${p.name}</span><div class="price-input-wrap"><span>₺</span><input type="number" min="0" step="1" value="${p.price}" data-pid="${p.id}" class="price-input"></div></div>`;
                });
                h+='</div>';
            });
            h+='<button class="btn-action" id="admSavePrices" style="margin-top:15px;">💾 Fiyatları Kaydet</button></div>';
            c.innerHTML=h;
            document.getElementById('admSavePrices').addEventListener('click', () => {
                c.querySelectorAll('.price-input').forEach(inp => { const p=PRODUCTS.find(x=>x.id===inp.dataset.pid); if(p) p.price=parseFloat(inp.value)||0; });
                PriceManager.save(); showToast('Fiyatlar kaydedildi ✓','success');
            });
        },
        renderOrders(c) {
            const orders=OrderTracker.getAll();
            let h=`<div class="admin-section"><h3>📦 Siparişler (${orders.length})</h3><button class="btn-action" id="admExportCSV" style="margin-bottom:15px;">📄 CSV İndir</button>`;
            if(!orders.length) h+='<p style="color:var(--text-light);">Henüz sipariş yok.</p>';
            else { h+='<div class="order-list">'; orders.forEach(o => {
                const sc=o.status==='Teslim Edildi'?'delivered':o.status==='Onaylandı'?'confirmed':'pending';
                h+=`<div class="order-card"><div class="order-header"><strong>${o.name}</strong><span class="order-date">${o.date}</span></div>
                <div class="order-body"><span>📞 ${o.phone}</span><span>💳 ${o.payment}</span><span class="order-total">₺${o.total}</span></div>
                <div class="order-items">${o.items}</div>
                <div class="order-footer"><span class="order-status ${sc}">${o.status}</span>
                <select class="order-status-select" data-oid="${o.id}"><option value="Beklemede" ${o.status==='Beklemede'?'selected':''}>Beklemede</option><option value="Onaylandı" ${o.status==='Onaylandı'?'selected':''}>Onaylandı</option><option value="Teslim Edildi" ${o.status==='Teslim Edildi'?'selected':''}>Teslim Edildi</option></select></div></div>`;
            }); h+='</div>'; }
            h+='</div>'; c.innerHTML=h;
            document.getElementById('admExportCSV').addEventListener('click', () => OrderTracker.exportCSV());
            c.querySelectorAll('.order-status-select').forEach(sel => sel.addEventListener('change', e => {
                OrderTracker.updateStatus(e.target.dataset.oid, e.target.value); this.renderOrders(c); showToast('Durum güncellendi.','success');
            }));
        },
        renderSettings(c) {
            const dlL=DownloadTracker.getLimit(), dlC=DownloadTracker.getCount();
            c.innerHTML = `<div class="admin-section"><h3>🔧 Galeri Ayarları</h3>
                <div class="setting-row"><div><strong>⬇️ Günlük İndirme Limiti</strong><p style="color:var(--text-light);font-size:12px;">0 = Sınırsız | Bugün: ${dlC}</p></div>
                <input type="number" min="0" value="${dlL}" id="admDlLimit" class="admin-input" style="width:80px;"></div>
                <button class="btn-action" id="admSaveSettings" style="margin-top:15px;">💾 Kaydet</button></div>`;
            document.getElementById('admSaveSettings').addEventListener('click', () => {
                DownloadTracker.setLimit(parseInt(document.getElementById('admDlLimit').value)||0);
                showToast('Ayarlar kaydedildi ✓','success');
            });
        },
        updateBreadcrumb() { document.getElementById('breadcrumb').innerHTML=`<span class="bc-current">🛡️ Admin — ${currentSchool.name}</span>`; },
        downloadConfig() {
            const prices={}; PRODUCTS.forEach(p=>prices[p.id]=p.price);
            const cfg={schools:[{...currentSchool,prices}]};
            const a=document.createElement('a'); a.href="data:text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(cfg,null,2));
            a.download="teslimat-config.json"; document.body.appendChild(a); a.click(); document.body.removeChild(a);
            showToast('Config indirildi.','success');
        }
    };

    // ==========================================
    // MODULE 7: Downloader
    // ==========================================
    const Downloader = {
        async downloadSelected() {
            if (selectedPhotos.size === 0) return;
            if (!DownloadTracker.canDownload()) { showToast('Günlük indirme limitinize ulaştınız.','error'); return; }

            const overlay = document.getElementById('dlOverlay');
            const status = document.getElementById('dlStatus');
            const bar = document.getElementById('dlProgressFill');
            overlay.classList.remove('hidden');

            let completed = 0;
            const total = selectedPhotos.size;
            status.textContent = `0 / ${total}`;
            bar.style.width = '0%';

            try {
                if (total === 1) {
                    // Single file — direct download
                    const photoId = [...selectedPhotos][0];
                    const photo = currentSchool.photos.find(p => p.id === photoId);
                    const url = PHOTO_BASE_URL + currentSchool.basePath + photo.original;
                    const filename = photo.original.split('/').pop() || `${photo.id}.jpg`;
                    try {
                        const response = await fetch(url);
                        if (!response.ok) throw new Error("Network response was not ok");
                        const blob = await response.blob();
                        const a = document.createElement('a');
                        a.href = URL.createObjectURL(blob);
                        a.download = filename;
                        a.click();
                        URL.revokeObjectURL(a.href);
                    } catch (fetchErr) {
                        alert("Tarayıcınız güvenlik (CORS) nedeniyle indirmeyi engelledi. Cloudflare R2 CORS ayarlarınızı yaptığınızdan emin olun.");
                        status.textContent = 'Hata!';
                        return;
                    }
                    status.textContent = 'Tamamlandı!';
                    bar.style.width = '100%';
                } else {
                    // Multiple — ZIP
                    const zip = new JSZip();
                    const folder = zip.folder(currentSchool.name.replace(/\s+/g, '_'));
                    const photosToDownload = currentSchool.photos.filter(p => selectedPhotos.has(p.id));

                    let zipHasFiles = false;
                    for (const photo of photosToDownload) {
                        const url = PHOTO_BASE_URL + currentSchool.basePath + photo.original;
                        try {
                            const response = await fetch(url);
                            if(!response.ok) throw new Error("CORS or Network error");
                            const blob = await response.blob();
                            const filename = photo.original.split('/').pop() || `${photo.id}.jpg`;
                            folder.file(filename, blob);
                            zipHasFiles = true;
                            completed++;
                            status.textContent = `${completed} / ${total}`;
                            bar.style.width = `${(completed / total) * 100}%`;
                        } catch(e) {
                            console.warn("Toplu indirme fetch hatası:", e);
                        }
                    }

                    if(zipHasFiles) {
                        status.textContent = 'ZIP oluşturuluyor...';
                        const zipBlob = await zip.generateAsync({ type: 'blob' });
                        saveAs(zipBlob, `${currentSchool.name.replace(/\s+/g, '_')}_fotograflar.zip`);
                        status.textContent = 'Tamamlandı!';
                        bar.style.width = '100%';
                    } else {
                        alert("Tarayıcınız güvenlik (CORS) nedeniyle toplu ZIP oluşturmayı engelledi. Cloudflare R2 CORS ayarlarınızı yaptığınızdan emin olun veya fotoğrafları tek tek indirin.");
                        status.textContent = 'Hata!';
                        overlay.classList.add('hidden');
                        return;
                    }
                }
                showToast('İndirme tamamlandı ✓', 'success');
                DownloadTracker.increment();
            } catch (err) {
                console.error('İndirme hatası:', err);
                showToast('İndirme sırasında hata oluştu: ' + err.message, 'error');
                overlay.classList.add('hidden');
                return;
            }
            setTimeout(() => overlay.classList.add('hidden'), 1000);
        }
    };

    // ==========================================
    // MODULE 8: ProductBar & MockupRenderer
    // ==========================================
    const ProductBar = {
        DOM_ID: 'kpsProductBar',
        currentCategory: 'baski',
        
        init() {
            document.body.classList.add('shop-bar-active');
            const existing = document.getElementById(this.DOM_ID);
            if (existing) {
                existing.classList.add('active');
                existing.classList.remove('minimized');
                return;
            }
            
            const categories = [...new Set(PRODUCTS.map(p => p.category))];
            const catLabels = {};
            PRODUCTS.forEach(p => catLabels[p.category] = p.categoryLabel);
            
            const wrapper = document.createElement('div');
            wrapper.id = this.DOM_ID;
            wrapper.className = 'shop-bar-wrapper active';
            
            let headerHtml = `
                <div class="shop-bar-header" style="text-align:center; padding-bottom:10px;">
                    <button id="shopBarToggleBtn" style="background:none; border:none; color:var(--text-light); font-weight:600; font-family:'Outfit'; font-size:13px; cursor:pointer; display:inline-flex; align-items:center; gap:5px;">
                        <span>Ürün Seçenekleri</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </button>
                </div>
            `;
            
            let tabsHtml = '<div class="shop-tabs" id="shopBarContentArea">';
            categories.forEach(cat => {
                const icon = CAT_ICONS[cat] || '';
                tabsHtml += `<button class="shop-tab ${cat === this.currentCategory ? 'active' : ''}" data-cat="${cat}">${icon}${catLabels[cat]}</button>`;
            });
            tabsHtml += '</div>';
            
            let productsHtml = '<div class="shop-products" id="shopProductsContainer"></div>';
            
            wrapper.innerHTML = headerHtml + tabsHtml + productsHtml;
            document.body.appendChild(wrapper);
            
            const toggleBtn = document.getElementById('shopBarToggleBtn');
            toggleBtn.addEventListener('click', () => {
                wrapper.classList.toggle('minimized');
                const isMinimized = wrapper.classList.contains('minimized');
                document.body.classList.toggle('shop-bar-minimized', isMinimized);
                const iconPath = isMinimized ? '<polyline points="18 15 12 9 6 15"></polyline>' : '<polyline points="6 9 12 15 18 9"></polyline>';
                toggleBtn.querySelector('svg').innerHTML = iconPath;
            });

            wrapper.querySelectorAll('.shop-tab').forEach(tab => {
                tab.addEventListener('click', (e) => {
                    wrapper.querySelectorAll('.shop-tab').forEach(t => t.classList.remove('active'));
                    e.target.classList.add('active');
                    this.currentCategory = e.target.dataset.cat;
                    this.renderProducts();
                    if(activeLightboxThumbUrl) this.updateMockups(activeLightboxThumbUrl);
                });
            });
            
            this.renderProducts();
        },
        
        renderProducts() {
            const container = document.getElementById('shopProductsContainer');
            if(!container) return;
            
            const filtered = PRODUCTS.filter(p => p.category === this.currentCategory);
            
            let html = '';
            filtered.forEach(p => {
                html += `
                    <div class="shop-card">
                        <div class="css-mockup shape-${p.mockup.shape}" id="mockup-${p.id}">
                            <div class="mockup-inner"></div>
                            <div class="mockup-glare"></div>
                        </div>
                        <h4 title="${p.name}">${p.name}</h4>
                        <div class="price">₺${p.price}</div>
                        <button class="btn-add" data-pid="${p.id}">Sepete Ekle</button>
                    </div>
                `;
            });
            
            container.innerHTML = html;
            
            container.querySelectorAll('.btn-add').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const pid = e.target.dataset.pid;
                    const product = PRODUCTS.find(p => p.id === pid);
                    Cart.add(activeLightboxPhotoId, activeLightboxPhotoUrl, activeLightboxThumbUrl, product);
                    
                    const origText = e.target.textContent;
                    e.target.textContent = '✓ Eklendi';
                    e.target.style.background = 'var(--bento-green)';
                    setTimeout(() => {
                        e.target.textContent = origText;
                        e.target.style.background = '';
                    }, 1500);
                });
            });
        },
        
        updateMockups(photoUrl) {
            if(!photoUrl) return;
            const filtered = PRODUCTS.filter(p => p.category === this.currentCategory);
            
            filtered.forEach(p => {
                const inner = document.querySelector(`#mockup-${p.id} .mockup-inner`);
                if(inner) {
                    inner.style.backgroundImage = `url('${photoUrl}')`;
                }
            });
        },
        
        hide() {
            document.body.classList.remove('shop-bar-active');
            const bar = document.getElementById(this.DOM_ID);
            if (bar) bar.classList.remove('active');
        }
    };




    // ==========================================
    // MODULE 9: Cart
    // ==========================================
    const Cart = {
        items: [],
        
        init() {
            const saved = localStorage.getItem('kps_cart');
            if (saved) {
                try { this.items = JSON.parse(saved); } catch(e){}
            }
            
            this.updateUI();
            
            document.getElementById('cartFab').addEventListener('click', () => {
                document.getElementById('cartPanel').classList.add('active');
                document.getElementById('cartOverlay').classList.add('active');
                document.body.style.overflow = 'hidden';
                this.renderItems();
            });
            
            const closeCart = () => {
                document.getElementById('cartPanel').classList.remove('active');
                document.getElementById('cartOverlay').classList.remove('active');
                document.body.style.overflow = '';
            };
            
            document.getElementById('closeCartBtn').addEventListener('click', closeCart);
            document.getElementById('cartOverlay').addEventListener('click', closeCart);
            
            // ESC key to close panels
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    const checkoutModal = document.getElementById('checkoutModal');
                    if (!checkoutModal.classList.contains('hidden')) {
                        checkoutModal.classList.add('hidden');
                        document.body.style.overflow = '';
                        return;
                    }
                    if (document.getElementById('cartPanel').classList.contains('active')) {
                        closeCart();
                        return;
                    }
                }
            });
            
            document.getElementById('checkoutBtn').addEventListener('click', () => {
                if(this.items.length === 0) return;
                closeCart();
                Checkout.open();
            });
        },
        
        save() {
            localStorage.setItem('kps_cart', JSON.stringify(this.items));
            this.updateUI();
            if (document.getElementById('cartPanel').classList.contains('active')) {
                this.renderItems();
            }
        },
        
        add(photoId, photoUrl, thumbUrl, product) {
            const existing = this.items.find(i => i.photoId === photoId && i.productId === product.id);
            if (existing) {
                existing.qty += 1;
            } else {
                this.items.push({
                    id: Date.now().toString(),
                    photoId,
                    photoUrl,
                    thumbUrl,
                    productId: product.id,
                    productName: product.name,
                    price: product.price,
                    qty: 1
                });
            }
            this.save();
        },
        
        remove(id) {
            this.items = this.items.filter(i => i.id !== id);
            this.save();
        },
        
        updateQty(id, delta) {
            const item = this.items.find(i => i.id === id);
            if (item) {
                item.qty += delta;
                if (item.qty <= 0) this.remove(id);
                else this.save();
            }
        },
        
        clear() {
            this.items = [];
            this.save();
        },
        
        updateUI() {
            const count = this.items.reduce((sum, item) => sum + item.qty, 0);
            const total = this.items.reduce((sum, item) => sum + (item.price * item.qty), 0);
            
            document.getElementById('cartBadge').textContent = count;
            document.getElementById('cartTotalPrice').textContent = `₺${total}`;
            
            const btn = document.getElementById('checkoutBtn');
            btn.disabled = count === 0;
            btn.textContent = count === 0 ? 'Sepetiniz Boş' : 'Siparişi Tamamla';
        },
        
        renderItems() {
            const container = document.getElementById('cartItems');
            if (this.items.length === 0) {
                container.innerHTML = '<div style="text-align:center;color:#999;padding:40px 0;">Sepetinizde ürün bulunmamaktadır.</div>';
                return;
            }
            
            let html = '';
            this.items.forEach(item => {
                html += `
                    <div class="cart-item">
                        <img src="${item.thumbUrl}" class="cart-item-img">
                        <div class="cart-item-details">
                            <div class="cart-item-title">${item.productName}</div>
                            <div style="font-size:12px; color:#666; margin-bottom:5px;">Fotoğraf: ${item.photoId}</div>
                            <div class="cart-item-price">₺${item.price}</div>
                            <div class="cart-item-actions">
                                <div class="qty-control">
                                    <button class="qty-btn" onclick="document.dispatchEvent(new CustomEvent('cartQty', {detail: {id:'${item.id}', d:-1}}))">-</button>
                                    <span>${item.qty}</span>
                                    <button class="qty-btn" onclick="document.dispatchEvent(new CustomEvent('cartQty', {detail: {id:'${item.id}', d:1}}))">+</button>
                                </div>
                                <button class="btn-remove" onclick="document.dispatchEvent(new CustomEvent('cartRm', {detail: '${item.id}'}))">Kaldır</button>
                            </div>
                        </div>
                    </div>
                `;
            });
            container.innerHTML = html;
        }
    };
    
    document.addEventListener('cartQty', (e) => Cart.updateQty(e.detail.id, e.detail.d));
    document.addEventListener('cartRm', (e) => Cart.remove(e.detail));

    // ==========================================
    // MODULE 10: Checkout
    // ==========================================
    const Checkout = {
        init() {
            const modal = document.getElementById('checkoutModal');
            document.getElementById('closeCheckoutBtn').addEventListener('click', () => {
                modal.classList.add('hidden');
                document.body.style.overflow = '';
            });
            
            const form = document.getElementById('checkoutForm');
            if (form) {
                form.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    
                    const btn = document.getElementById('submitOrderBtn');
                    if (btn.disabled) return; // BUG-12: debounce
                    const origText = btn.innerHTML;
                    btn.innerHTML = 'Gönderiliyor...';
                    btn.disabled = true;
                    
                    let orderDetails = "SİPARİŞ DETAYI\n-----------------\n";
                    let total = 0;
                    Cart.items.forEach((item, i) => {
                        orderDetails += `${i+1}. ${item.productName} (Foto: ${item.photoId}) - Adet: ${item.qty} - Fiyat: ₺${item.price * item.qty}\n`;
                        total += (item.price * item.qty);
                    });
                    orderDetails += `-----------------\nTOPLAM: ₺${total}`;
                    
                    document.getElementById('cartDataInput').value = orderDetails;
                    
                    const fd = new FormData(form);
                    fd.set('_subject', `[SİPARİŞ] ${currentSchool.name} — E-Ticaret`);
                    fd.set('Okul Adı', currentSchool.name);
                    
                    try {
                        const response = await fetch(form.action, {
                            method: form.method,
                            body: fd,
                            headers: { 'Accept': 'application/json' }
                        });
                        if (response.ok) {
                            // Save order to tracker
                            const fd2 = new FormData(form);
                            OrderTracker.add({
                                name: fd2.get('name'), phone: fd2.get('phone'),
                                address: fd2.get('address'), payment: fd2.get('payment'),
                                items: Cart.items.map(i=>`${i.productName}(${i.photoId})x${i.qty}`).join(', '),
                                total: Cart.items.reduce((s,i)=>s+i.price*i.qty,0)
                            });
                            modal.classList.add('hidden');
                            document.body.style.overflow = '';
                            document.getElementById('successOverlay').classList.remove('hidden');
                            Cart.clear();
                            form.reset();
                        } else {
                            showToast('Bir hata oluştu, lütfen tekrar deneyin.', 'error');
                        }
                    } catch (error) {
                        showToast('Sunucu hatası, lütfen tekrar deneyin.', 'error');
                    } finally {
                        btn.innerHTML = origText;
                        btn.disabled = false;
                    }
                });
            }
        },
        
        open() {
            document.getElementById('checkoutModal').classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    };

    // ==========================================
    // INIT
    // ==========================================
    document.addEventListener('DOMContentLoaded', () => {
        if (document.getElementById('teslimatAuth')) {
            AuthGate.init();
            
            Cart.init();
            Checkout.init();

            // Success modal close
            const successClose = document.getElementById('successCloseBtn');
            if (successClose) {
                successClose.addEventListener('click', () => {
                    document.getElementById('successOverlay').classList.add('hidden');
                });
            }
        }
    });

})();
