// A simple pseudo-random number generator to have deterministic results
function mulberry32(a) {
    return function() {
      var t = a += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}

// Simple string hash function
function cyrb53(str, seed = 0) {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1>>>16), 2246822507) ^ Math.imul(h2 ^ (h2>>>13), 3266489909);
    h2 = Math.imul(h2 ^ (h2>>>16), 2246822507) ^ Math.imul(h1 ^ (h1>>>13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1>>>0);
};

export function generateSymbol(canvas, userData) {
    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;
    const centerX = width / 2;
    const centerY = height / 2;

    const seedString = `${userData.name}${userData.dob}${userData.word}${userData.number}`;
    const seed = cyrb53(seedString);
    const random = mulberry32(seed);

    ctx.clearRect(0, 0, width, height);

    const colors = ['#ffd700', '#ffea00', '#f0e68c', '#ffffff', '#b0c4de'];
    const numLines = 4 + Math.floor(random() * (parseInt(userData.number) || 4));
    const numCircles = 1 + Math.floor(random() * (userData.word.length % 3));
    const radius = Math.min(width, height) / 2 * (0.4 + random() * 0.4);

    ctx.lineWidth = 1 + random() * 3;
    ctx.strokeStyle = colors[Math.floor(random() * colors.length)];

    // Draw symmetrical lines
    for (let i = 0; i < numLines; i++) {
        ctx.beginPath();
        const angle = (i / numLines) * Math.PI * 2;
        const x1 = centerX + Math.cos(angle) * radius * (0.5 + random() * 0.5);
        const y1 = centerY + Math.sin(angle) * radius * (0.5 + random() * 0.5);
        const nextAngle = ((i + Math.floor(1 + random() * (numLines / 2))) / numLines) * Math.PI * 2;
        const x2 = centerX + Math.cos(nextAngle) * radius;
        const y2 = centerY + Math.sin(nextAngle) * radius;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }
    
    // Draw concentric circles
    for (let i = 0; i < numCircles; i++) {
        ctx.beginPath();
        const circleRadius = radius * (0.2 + (i / numCircles) * 0.7) * (0.8 + random() * 0.4);
        ctx.arc(centerX, centerY, circleRadius, 0, 2 * Math.PI);
        ctx.strokeStyle = colors[Math.floor(random() * colors.length)];
        ctx.lineWidth = 1 + random() * 2;
        ctx.stroke();
    }

    // Draw central shape based on power number
    ctx.fillStyle = colors[Math.floor(random() * colors.length)];
    const centralShapeSize = radius * 0.2;
    ctx.beginPath();
    const points = parseInt(userData.number) || 4;
    for(let i = 0; i < points; i++) {
        const angle = (i / points) * Math.PI * 2;
        const x = centerX + Math.cos(angle) * centralShapeSize;
        const y = centerY + Math.sin(angle) * centralShapeSize;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
}

