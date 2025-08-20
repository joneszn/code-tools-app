const fs = require('fs');

// Simple ICO file generator
function createSimpleFavicon() {
    // ICO file header (6 bytes)
    const icoHeader = Buffer.from([
        0x00, 0x00, // Reserved (must be 0)
        0x01, 0x00, // Type (1 = ICO)
        0x01, 0x00  // Number of images
    ]);
    
    // Directory entry (16 bytes)
    const dirEntry = Buffer.from([
        0x10, // Width (16 pixels)
        0x10, // Height (16 pixels)
        0x00, // Color palette (0 = no palette)
        0x00, // Reserved
        0x01, 0x00, // Color planes (1)
        0x20, 0x00, // Bits per pixel (32)
        0x00, 0x00, 0x00, 0x00, // Size of bitmap data (will update)
        0x16, 0x00, 0x00, 0x00  // Offset to bitmap data (22 bytes)
    ]);
    
    // Create a simple 16x16 icon with gradient background and white text
    const bmpData = [];
    
    // BMP header (40 bytes)
    const bmpHeader = Buffer.from([
        0x28, 0x00, 0x00, 0x00, // Header size (40)
        0x10, 0x00, 0x00, 0x00, // Width (16)
        0x20, 0x00, 0x00, 0x00, // Height (32 - includes AND mask)
        0x01, 0x00,             // Planes (1)
        0x20, 0x00,             // Bits per pixel (32)
        0x00, 0x00, 0x00, 0x00, // Compression (0 = none)
        0x00, 0x00, 0x00, 0x00, // Image size (0 for uncompressed)
        0x00, 0x00, 0x00, 0x00, // X pixels per meter
        0x00, 0x00, 0x00, 0x00, // Y pixels per meter
        0x00, 0x00, 0x00, 0x00, // Colors used (0 = all)
        0x00, 0x00, 0x00, 0x00  // Important colors (0 = all)
    ]);
    
    // Create 16x16 pixel data (BGRA format, bottom to top)
    const pixelData = [];
    
    for (let y = 15; y >= 0; y--) {
        for (let x = 0; x < 16; x++) {
            // Create gradient from blue to purple
            const r = Math.floor(102 + (118 - 102) * (y / 15));
            const g = Math.floor(126 + (75 - 126) * (y / 15));
            const b = Math.floor(234 + (162 - 234) * (y / 15));
            
            // Simple pattern for '</' text
            let isText = false;
            if (y >= 6 && y <= 10) {
                if (x >= 3 && x <= 12) {
                    // '<' shape
                    if (x >= 4 && x <= 6 && (y === 8 || (y >= 6 && y <= 10 && x === 6))) isText = true;
                    // '/' shape
                    if (x >= 9 && x <= 11 && ((x === 9 && y >= 9) || (x === 10 && y === 8) || (x === 11 && y <= 7))) isText = true;
                }
            }
            
            if (isText) {
                // White text
                pixelData.push(0xFF, 0xFF, 0xFF, 0xFF); // BGRA
            } else {
                // Gradient background
                pixelData.push(b, g, r, 0xFF); // BGRA
            }
        }
    }
    
    // AND mask (1 bit per pixel, all transparent)
    const andMask = Buffer.alloc(32, 0x00); // 16x16 bits = 32 bytes
    
    // Combine all data
    const bitmapData = Buffer.concat([bmpHeader, Buffer.from(pixelData), andMask]);
    
    // Update directory entry with correct size
    dirEntry.writeUInt32LE(bitmapData.length, 8);
    
    // Combine all parts
    const icoFile = Buffer.concat([icoHeader, dirEntry, bitmapData]);
    
    fs.writeFileSync('./public/favicon.ico', icoFile);
    console.log('favicon.ico created successfully!');
}

// Run the function
try {
    createSimpleFavicon();
} catch (error) {
    console.error('Error creating favicon:', error);
}
