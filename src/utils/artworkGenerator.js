// Advanced SVG artwork generator for quote NFTs with sophisticated visual elements
export class ArtworkGenerator {
  static generateUniqueArtwork(quote, author) {
    const hash = this.advancedHash(quote + author);
    const params = this.extractAdvancedParams(hash);
    return this.createAdvancedSVG(params, quote, author);
  }

  static advancedHash(str) {
    let hash = 0;
    let secondaryHash = 0;
    
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
      
      secondaryHash = ((secondaryHash << 3) + secondaryHash) + char;
      secondaryHash = secondaryHash & secondaryHash;
    }
    
    return {
      primary: Math.abs(hash),
      secondary: Math.abs(secondaryHash),
      combined: Math.abs(hash + secondaryHash)
    };
  }

  static extractAdvancedParams(hash) {
    const { primary, secondary, combined } = hash;
    
    return {
      // Advanced color palette
      primaryHue: primary % 360,
      secondaryHue: (primary + 120 + (secondary % 60)) % 360,
      tertiaryHue: (primary + 240 + (combined % 60)) % 360,
      
      // Background colors with more sophisticated gradients
      bgColor1: `hsl(${primary % 360}, ${40 + (primary % 40)}%, ${15 + (primary % 15)}%)`,
      bgColor2: `hsl(${(primary + 60) % 360}, ${30 + (secondary % 40)}%, ${25 + (secondary % 20)}%)`,
      bgColor3: `hsl(${(primary + 180) % 360}, ${20 + (combined % 30)}%, ${35 + (combined % 15)}%)`,
      
      // Accent colors
      accentColor1: `hsl(${(primary + 30) % 360}, ${70 + (primary % 30)}%, ${55 + (primary % 25)}%)`,
      accentColor2: `hsl(${(secondary + 90) % 360}, ${60 + (secondary % 30)}%, ${45 + (secondary % 30)}%)`,
      accentColor3: `hsl(${(combined + 150) % 360}, ${80 + (combined % 20)}%, ${65 + (combined % 20)}%)`,
      
      // Text styling
      textColor: primary % 3 === 0 ? '#ffffff' : primary % 3 === 1 ? '#f8f9fa' : '#e9ecef',
      textShadowColor: `hsl(${primary % 360}, 50%, 10%)`,
      
      // Geometric patterns
      patternType: primary % 8, // 8 different pattern types
      geometricComplexity: 2 + (secondary % 6), // 2-7 complexity levels
      
      // Shape generation
      shapeCount: 5 + (primary % 12), // 5-16 shapes
      shapeVariety: secondary % 5, // Different shape types
      
      // Transformations
      rotation: primary % 360,
      secondaryRotation: secondary % 360,
      scale: 0.7 + ((primary % 60) / 100), // 0.7-1.3
      skew: -15 + (secondary % 30), // -15 to 15 degrees
      
      // Animation parameters
      animationDuration: 4 + (primary % 8), // 4-11 seconds
      animationDelay: (secondary % 3) * 0.5, // 0, 0.5, 1 second delays
      pulseIntensity: 0.2 + ((combined % 30) / 100), // 0.2-0.5
      
      // Advanced visual effects
      noiseIntensity: 0.1 + ((primary % 20) / 100), // 0.1-0.3
      blurRadius: 1 + (secondary % 4), // 1-4px
      glowIntensity: 0.3 + ((combined % 40) / 100), // 0.3-0.7
      
      // Texture and depth
      textureType: combined % 4,
      depthLayers: 3 + (primary % 4), // 3-6 layers
      parallaxOffset: 5 + (secondary % 15), // 5-19px
      
      // Artistic elements
      brushStrokeWidth: 1 + (primary % 4), // 1-4px
      organicFlow: (secondary % 100) / 100, // 0-1 organic vs geometric
      symmetryLevel: combined % 3, // 0: asymmetric, 1: partial, 2: full symmetry
    };
  }

  static createAdvancedSVG(params, quote, author) {
    const width = 500;
    const height = 500;
    
    // Smart quote truncation with better word breaking
    const displayQuote = this.formatQuoteText(quote);
    
    return `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          ${this.createAdvancedGradients(params)}
          ${this.createAdvancedPatterns(params)}
          ${this.createAdvancedFilters(params)}
          ${this.createClipPaths(params)}
          ${this.createTextures(params)}
        </defs>
        
        <!-- Multi-layer background -->
        ${this.createLayeredBackground(params)}
        
        <!-- Geometric art layer -->
        ${this.createGeometricArt(params)}
        
        <!-- Organic flow elements -->
        ${this.createOrganicElements(params)}
        
        <!-- Decorative frame -->
        ${this.createDecorativeFrame(params)}
        
        <!-- Quote text with advanced typography -->
        ${this.createAdvancedQuoteText(params, displayQuote, width, height)}
        
        <!-- Author with artistic styling -->
        ${this.createStylizedAuthor(params, author, width, height)}
        
        <!-- NFT branding with artistic integration -->
        ${this.createArtisticBranding(params, width, height)}
        
        <!-- Final overlay effects -->
        ${this.createFinalOverlays(params)}
      </svg>
    `;
  }

  static formatQuoteText(quote) {
    if (quote.length <= 100) return quote;
    
    // Smart truncation at word boundaries
    const words = quote.split(' ');
    let result = '';
    let currentLength = 0;
    
    for (const word of words) {
      if (currentLength + word.length + 1 > 97) {
        result += '...';
        break;
      }
      result += (result ? ' ' : '') + word;
      currentLength += word.length + 1;
    }
    
    return result;
  }

  static createAdvancedGradients(params) {
    return `
      <!-- Multi-stop background gradient -->
      <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${params.bgColor1};stop-opacity:1" />
        <stop offset="50%" style="stop-color:${params.bgColor2};stop-opacity:0.9" />
        <stop offset="100%" style="stop-color:${params.bgColor3};stop-opacity:1" />
      </linearGradient>
      
      <!-- Radial gradient for depth -->
      <radialGradient id="depthGradient" cx="50%" cy="30%" r="80%">
        <stop offset="0%" style="stop-color:${params.accentColor1};stop-opacity:0.4" />
        <stop offset="70%" style="stop-color:${params.accentColor2};stop-opacity:0.2" />
        <stop offset="100%" style="stop-color:${params.bgColor1};stop-opacity:0.1" />
      </radialGradient>
      
      <!-- Artistic accent gradients -->
      <linearGradient id="accentGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:${params.accentColor1};stop-opacity:0.8" />
        <stop offset="50%" style="stop-color:${params.accentColor2};stop-opacity:0.6" />
        <stop offset="100%" style="stop-color:${params.accentColor3};stop-opacity:0.4" />
      </linearGradient>
      
      <radialGradient id="accentGradient2" cx="30%" cy="70%" r="60%">
        <stop offset="0%" style="stop-color:${params.accentColor2};stop-opacity:0.7" />
        <stop offset="100%" style="stop-color:${params.accentColor1};stop-opacity:0.2" />
      </radialGradient>
      
      <!-- Text gradient for premium feel -->
      <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${params.textColor};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${params.accentColor1};stop-opacity:0.9" />
      </linearGradient>
      
      <!-- Shimmer effect -->
      <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:transparent;stop-opacity:0" />
        <stop offset="50%" style="stop-color:${params.accentColor3};stop-opacity:0.6" />
        <stop offset="100%" style="stop-color:transparent;stop-opacity:0" />
        <animateTransform attributeName="gradientTransform" type="translate" 
                         values="-100 0;100 0;-100 0" dur="${params.animationDuration}s" repeatCount="indefinite"/>
      </linearGradient>
    `;
  }

  static createAdvancedPatterns(params) {
    const patterns = [];
    
    // Base pattern based on type
    switch (params.patternType) {
      case 0: // Sophisticated geometric circles
        patterns.push(`
          <pattern id="pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="30" cy="30" r="15" fill="none" stroke="${params.accentColor1}" 
                    stroke-width="2" opacity="0.3"/>
            <circle cx="30" cy="30" r="8" fill="${params.accentColor2}" opacity="0.2"/>
            <circle cx="15" cy="15" r="4" fill="${params.accentColor3}" opacity="0.4"/>
            <circle cx="45" cy="45" r="4" fill="${params.accentColor3}" opacity="0.4"/>
          </pattern>
        `);
        break;
        
      case 1: // Complex mandala-like patterns
        patterns.push(`
          <pattern id="pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <g transform="translate(40,40)">
              <polygon points="0,-20 12,-6 20,0 12,6 0,20 -12,6 -20,0 -12,-6" 
                       fill="${params.accentColor1}" opacity="0.2"/>
              <polygon points="0,-12 7,-4 12,0 7,4 0,12 -7,4 -12,0 -7,-4" 
                       fill="${params.accentColor2}" opacity="0.3"/>
              <circle cx="0" cy="0" r="6" fill="${params.accentColor3}" opacity="0.4"/>
            </g>
          </pattern>
        `);
        break;
        
      case 2: // Flowing organic lines
        patterns.push(`
          <pattern id="pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M0,50 Q25,20 50,50 T100,50" stroke="${params.accentColor1}" 
                  stroke-width="3" fill="none" opacity="0.2"/>
            <path d="M0,25 Q50,5 100,25" stroke="${params.accentColor2}" 
                  stroke-width="2" fill="none" opacity="0.3"/>
            <path d="M0,75 Q50,95 100,75" stroke="${params.accentColor3}" 
                  stroke-width="1" fill="none" opacity="0.4"/>
          </pattern>
        `);
        break;
        
      case 3: // Crystalline structures
        patterns.push(`
          <pattern id="pattern" x="0" y="0" width="70" height="70" patternUnits="userSpaceOnUse">
            <g transform="translate(35,35)">
              <polygon points="0,-25 15,-8 25,0 15,8 0,25 -15,8 -25,0 -15,-8" 
                       fill="none" stroke="${params.accentColor1}" stroke-width="1" opacity="0.3"/>
              <polygon points="0,-15 9,-5 15,0 9,5 0,15 -9,5 -15,0 -9,-5" 
                       fill="${params.accentColor2}" opacity="0.15"/>
              <line x1="-25" y1="0" x2="25" y2="0" stroke="${params.accentColor3}" 
                    stroke-width="0.5" opacity="0.4"/>
              <line x1="0" y1="-25" x2="0" y2="25" stroke="${params.accentColor3}" 
                    stroke-width="0.5" opacity="0.4"/>
            </g>
          </pattern>
        `);
        break;
        
      case 4: // Art deco inspired
        patterns.push(`
          <pattern id="pattern" x="0" y="0" width="50" height="100" patternUnits="userSpaceOnUse">
            <polygon points="25,0 40,20 25,40 10,20" fill="${params.accentColor1}" opacity="0.2"/>
            <polygon points="25,50 40,70 25,90 10,70" fill="${params.accentColor2}" opacity="0.25"/>
            <rect x="20" y="15" width="10" height="10" fill="${params.accentColor3}" opacity="0.3"/>
            <rect x="20" y="65" width="10" height="10" fill="${params.accentColor3}" opacity="0.3"/>
          </pattern>
        `);
        break;
        
      case 5: // Tribal/ethnic patterns
        patterns.push(`
          <pattern id="pattern" x="0" y="0" width="90" height="90" patternUnits="userSpaceOnUse">
            <g transform="translate(45,45)">
              <path d="M-20,-20 L20,-20 L30,0 L20,20 L-20,20 L-30,0 Z" 
                    fill="none" stroke="${params.accentColor1}" stroke-width="2" opacity="0.3"/>
              <circle cx="0" cy="0" r="12" fill="none" stroke="${params.accentColor2}" 
                      stroke-width="1" opacity="0.4"/>
              <polygon points="0,-8 4,-4 8,0 4,4 0,8 -4,4 -8,0 -4,-4" 
                       fill="${params.accentColor3}" opacity="0.5"/>
            </g>
          </pattern>
        `);
        break;
        
      case 6: // Futuristic tech patterns
        patterns.push(`
          <pattern id="pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <rect x="10" y="10" width="40" height="40" fill="none" 
                  stroke="${params.accentColor1}" stroke-width="1" opacity="0.3"/>
            <rect x="20" y="20" width="20" height="20" fill="${params.accentColor2}" opacity="0.2"/>
            <circle cx="15" cy="15" r="3" fill="${params.accentColor3}" opacity="0.6"/>
            <circle cx="45" cy="15" r="3" fill="${params.accentColor3}" opacity="0.6"/>
            <circle cx="15" cy="45" r="3" fill="${params.accentColor3}" opacity="0.6"/>
            <circle cx="45" cy="45" r="3" fill="${params.accentColor3}" opacity="0.6"/>
            <line x1="15" y1="15" x2="45" y2="45" stroke="${params.accentColor1}" 
                  stroke-width="0.5" opacity="0.4"/>
            <line x1="45" y1="15" x2="15" y2="45" stroke="${params.accentColor1}" 
                  stroke-width="0.5" opacity="0.4"/>
          </pattern>
        `);
        break;
        
      default: // Sophisticated dot matrix
        patterns.push(`
          <pattern id="pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="6" fill="${params.accentColor1}" opacity="0.3"/>
            <circle cx="20" cy="20" r="3" fill="${params.accentColor2}" opacity="0.4"/>
            <circle cx="10" cy="10" r="2" fill="${params.accentColor3}" opacity="0.5"/>
            <circle cx="30" cy="10" r="2" fill="${params.accentColor3}" opacity="0.5"/>
            <circle cx="10" cy="30" r="2" fill="${params.accentColor3}" opacity="0.5"/>
            <circle cx="30" cy="30" r="2" fill="${params.accentColor3}" opacity="0.5"/>
          </pattern>
        `);
    }
    
    return patterns.join('');
  }

  static createAdvancedFilters(params) {
    return `
      <!-- Enhanced glow effect -->
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="${params.blurRadius}" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      
      <!-- Artistic blur for depth -->
      <filter id="softBlur" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2" result="blur"/>
        <feColorMatrix in="blur" type="matrix" 
                      values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.7 0"/>
      </filter>
      
      <!-- Emboss effect -->
      <filter id="emboss" x="-20%" y="-20%" width="140%" height="140%">
        <feConvolveMatrix order="3" kernelMatrix="1 1 0 1 0 -1 0 -1 -1"/>
        <feColorMatrix type="saturate" values="0"/>
        <feOffset dx="2" dy="2"/>
        <feFlood flood-color="${params.accentColor1}" flood-opacity="0.3"/>
        <feComposite operator="over"/>
      </filter>
      
      <!-- Noise texture -->
      <filter id="noise" x="0%" y="0%" width="100%" height="100%">
        <feTurbulence baseFrequency="${params.noiseIntensity}" numOctaves="3" 
                     seed="${params.rotation}" stitchTiles="stitch"/>
        <feColorMatrix type="saturate" values="0"/>
        <feComponentTransfer>
          <feFuncA type="discrete" tableValues="0 0.1 0.2 0.1 0"/>
        </feComponentTransfer>
        <feComposite operator="multiply"/>
      </filter>
      
      <!-- Artistic distortion -->
      <filter id="distort" x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence baseFrequency="0.02" numOctaves="2" result="turbulence"/>
        <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="5"/>
      </filter>
      
      <!-- Metallic sheen -->
      <filter id="metallic" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="1" result="blur"/>
        <feSpecularLighting result="specOut" lighting-color="${params.accentColor3}" 
                           specularConstant="2" specularExponent="20">
          <fePointLight x="250" y="150" z="200"/>
        </feSpecularLighting>
        <feComposite in="specOut" in2="SourceAlpha" operator="in"/>
        <feComposite in="SourceGraphic" operator="over"/>
      </filter>
    `;
  }

  static createClipPaths(params) {
    return `
      <!-- Artistic clipping paths -->
      <clipPath id="organicClip">
        <path d="M50,50 Q150,20 250,50 T450,50 Q450,150 400,250 Q350,350 250,350 Q150,350 100,250 Q50,150 50,50 Z"/>
      </clipPath>
      
      <clipPath id="geometricClip">
        <polygon points="100,100 400,100 450,200 400,400 100,400 50,200"/>
      </clipPath>
      
      <clipPath id="frameClip">
        <rect x="20" y="20" width="460" height="460" rx="40" ry="40"/>
      </clipPath>
    `;
  }

  static createTextures(params) {
    const textures = [];
    
    switch (params.textureType) {
      case 0: // Paper texture
        textures.push(`
          <pattern id="paperTexture" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <rect width="100" height="100" fill="${params.bgColor1}"/>
            <circle cx="20" cy="30" r="1" fill="${params.accentColor1}" opacity="0.1"/>
            <circle cx="70" cy="60" r="1.5" fill="${params.accentColor2}" opacity="0.08"/>
            <circle cx="40" cy="80" r="0.8" fill="${params.accentColor3}" opacity="0.12"/>
            <circle cx="85" cy="20" r="1.2" fill="${params.accentColor1}" opacity="0.09"/>
          </pattern>
        `);
        break;
        
      case 1: // Canvas texture
        textures.push(`
          <pattern id="canvasTexture" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
            <rect width="50" height="50" fill="${params.bgColor2}"/>
            <line x1="0" y1="10" x2="50" y2="10" stroke="${params.accentColor1}" 
                  stroke-width="0.3" opacity="0.15"/>
            <line x1="0" y1="20" x2="50" y2="20" stroke="${params.accentColor1}" 
                  stroke-width="0.3" opacity="0.15"/>
            <line x1="0" y1="30" x2="50" y2="30" stroke="${params.accentColor1}" 
                  stroke-width="0.3" opacity="0.15"/>
            <line x1="0" y1="40" x2="50" y2="40" stroke="${params.accentColor1}" 
                  stroke-width="0.3" opacity="0.15"/>
            <line x1="10" y1="0" x2="10" y2="50" stroke="${params.accentColor2}" 
                  stroke-width="0.3" opacity="0.1"/>
            <line x1="20" y1="0" x2="20" y2="50" stroke="${params.accentColor2}" 
                  stroke-width="0.3" opacity="0.1"/>
            <line x1="30" y1="0" x2="30" y2="50" stroke="${params.accentColor2}" 
                  stroke-width="0.3" opacity="0.1"/>
            <line x1="40" y1="0" x2="40" y2="50" stroke="${params.accentColor2}" 
                  stroke-width="0.3" opacity="0.1"/>
          </pattern>
        `);
        break;
        
      case 2: // Marble texture
        textures.push(`
          <pattern id="marbleTexture" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
            <rect width="200" height="200" fill="${params.bgColor3}"/>
            <path d="M0,100 Q50,80 100,100 T200,100" stroke="${params.accentColor1}" 
                  stroke-width="3" fill="none" opacity="0.2"/>
            <path d="M0,120 Q80,90 160,120 T200,120" stroke="${params.accentColor2}" 
                  stroke-width="2" fill="none" opacity="0.15"/>
            <path d="M0,80 Q120,110 200,80" stroke="${params.accentColor3}" 
                  stroke-width="1" fill="none" opacity="0.25"/>
          </pattern>
        `);
        break;
        
      default: // Silk texture
        textures.push(`
          <pattern id="silkTexture" x="0" y="0" width="150" height="150" patternUnits="userSpaceOnUse">
            <rect width="150" height="150" fill="${params.bgColor1}"/>
            <ellipse cx="75" cy="75" rx="60" ry="30" fill="none" 
                     stroke="${params.accentColor1}" stroke-width="1" opacity="0.1"/>
            <ellipse cx="75" cy="75" rx="40" ry="20" fill="none" 
                     stroke="${params.accentColor2}" stroke-width="0.5" opacity="0.15"/>
            <ellipse cx="75" cy="75" rx="20" ry="10" fill="${params.accentColor3}" opacity="0.08"/>
          </pattern>
        `);
    }
    
    return textures.join('');
  }

  static createLayeredBackground(params) {
    return `
      <!-- Base background -->
      <rect width="100%" height="100%" fill="url(#bgGradient)"/>
      
      <!-- Texture layer -->
      <rect width="100%" height="100%" fill="url(#${['paperTexture', 'canvasTexture', 'marbleTexture', 'silkTexture'][params.textureType]})" 
            opacity="0.4"/>
      
      <!-- Depth gradient -->
      <rect width="100%" height="100%" fill="url(#depthGradient)"/>
      
      <!-- Pattern layer with rotation -->
      <rect width="100%" height="100%" fill="url(#pattern)" 
            transform="rotate(${params.rotation} 250 250)" opacity="0.6"/>
      
      <!-- Secondary pattern layer -->
      <rect width="100%" height="100%" fill="url(#pattern)" 
            transform="rotate(${params.secondaryRotation} 250 250) scale(${params.scale})" 
            opacity="0.3"/>
    `;
  }

  static createGeometricArt(params) {
    const elements = [];
    
    // Generate complex geometric shapes
    for (let i = 0; i < params.geometricComplexity; i++) {
      const angle = (360 / params.geometricComplexity) * i;
      const radius = 100 + (i * 30);
      const x = 250 + Math.cos(angle * Math.PI / 180) * radius;
      const y = 250 + Math.sin(angle * Math.PI / 180) * radius;
      
      if (params.shapeVariety === 0) {
        // Polygons
        const sides = 3 + (i % 6);
        const points = [];
        for (let j = 0; j < sides; j++) {
          const pointAngle = (360 / sides) * j;
          const pointX = x + Math.cos(pointAngle * Math.PI / 180) * 20;
          const pointY = y + Math.sin(pointAngle * Math.PI / 180) * 20;
          points.push(`${pointX},${pointY}`);
        }
        
        elements.push(`
          <polygon points="${points.join(' ')}" 
                   fill="${params.accentColor1}" 
                   opacity="0.3" 
                   filter="url(#glow)"
                   transform="rotate(${angle + params.rotation} ${x} ${y})">
            <animateTransform attributeName="transform" type="rotate" 
                             values="${angle};${angle + 360};${angle}" 
                             dur="${params.animationDuration}s" repeatCount="indefinite"/>
          </polygon>
        `);
      } else if (params.shapeVariety === 1) {
        // Circles with complex animations
        elements.push(`
          <circle cx="${x}" cy="${y}" r="${15 + (i * 3)}" 
                  fill="none" 
                  stroke="${params.accentColor2}" 
                  stroke-width="${params.brushStrokeWidth}"
                  opacity="0.4"
                  filter="url(#glow)">
            <animate attributeName="r" 
                     values="${15 + (i * 3)};${25 + (i * 3)};${15 + (i * 3)}" 
                     dur="${params.animationDuration}s" repeatCount="indefinite"/>
            <animate attributeName="opacity" 
                     values="0.4;0.8;0.4" 
                     dur="${params.animationDuration}s" repeatCount="indefinite"/>
          </circle>
        `);
      } else {
        // Complex paths
        elements.push(`
          <path d="M${x},${y} Q${x + 30},${y - 30} ${x + 60},${y} T${x + 120},${y}" 
                stroke="${params.accentColor3}" 
                stroke-width="${params.brushStrokeWidth * 2}" 
                fill="none" 
                opacity="0.5"
                filter="url(#glow)">
            <animate attributeName="stroke-width" 
                     values="${params.brushStrokeWidth * 2};${params.brushStrokeWidth * 4};${params.brushStrokeWidth * 2}" 
                     dur="${params.animationDuration}s" repeatCount="indefinite"/>
          </path>
        `);
      }
    }
    
    return elements.join('');
  }

  static createOrganicElements(params) {
    const elements = [];
    
    // Organic flowing elements based on organicFlow parameter
    if (params.organicFlow > 0.3) {
      // Flowing curves
      elements.push(`
        <path d="M50,250 Q150,150 250,250 T450,250" 
              stroke="${params.accentColor1}" 
              stroke-width="${params.brushStrokeWidth * 3}" 
              fill="none" 
              opacity="0.3"
              filter="url(#softBlur)">
          <animate attributeName="d" 
                   values="M50,250 Q150,150 250,250 T450,250;M50,250 Q150,350 250,250 T450,250;M50,250 Q150,150 250,250 T450,250" 
                   dur="${params.animationDuration * 2}s" repeatCount="indefinite"/>
        </path>
      `);
      
      // Organic blobs
      for (let i = 0; i < 3; i++) {
        const x = 100 + (i * 150);
        const y = 100 + (i * 100);
        elements.push(`
          <ellipse cx="${x}" cy="${y}" rx="${20 + (i * 10)}" ry="${15 + (i * 8)}" 
                   fill="${params.accentColor2}" 
                   opacity="0.2"
                   filter="url(#softBlur)"
                   transform="rotate(${params.rotation + (i * 45)} ${x} ${y})">
            <animateTransform attributeName="transform" type="rotate" 
                             values="${params.rotation + (i * 45)};${params.rotation + (i * 45) + 360};${params.rotation + (i * 45)}" 
                             dur="${params.animationDuration * 3}s" repeatCount="indefinite"/>
          </ellipse>
        `);
      }
    }
    
    return elements.join('');
  }

  static createDecorativeFrame(params) {
    return `
      <!-- Outer decorative border -->
      <rect x="10" y="10" width="480" height="480" 
            fill="none" 
            stroke="url(#accentGradient1)" 
            stroke-width="3" 
            rx="20" ry="20" 
            opacity="0.6"/>
      
      <!-- Inner decorative border -->
      <rect x="20" y="20" width="460" height="460" 
            fill="none" 
            stroke="url(#accentGradient2)" 
            stroke-width="1" 
            rx="15" ry="15" 
            opacity="0.4"/>
      
      <!-- Corner decorations -->
      <g opacity="0.5">
        <!-- Top-left corner -->
        <path d="M30,30 L60,30 L60,35 L35,35 L35,60 L30,60 Z" 
              fill="${params.accentColor1}"/>
        
        <!-- Top-right corner -->
        <path d="M470,30 L440,30 L440,35 L465,35 L465,60 L470,60 Z" 
              fill="${params.accentColor1}"/>
        
        <!-- Bottom-left corner -->
        <path d="M30,470 L60,470 L60,465 L35,465 L35,440 L30,440 Z" 
              fill="${params.accentColor1}"/>
        
        <!-- Bottom-right corner -->
        <path d="M470,470 L440,470 L440,465 L465,465 L465,440 L470,440 Z" 
              fill="${params.accentColor1}"/>
      </g>
      
      <!-- Decorative elements along the frame -->
      <g opacity="0.4">
        <circle cx="250" cy="25" r="5" fill="${params.accentColor2}"/>
        <circle cx="25" cy="250" r="5" fill="${params.accentColor2}"/>
        <circle cx="475" cy="250" r="5" fill="${params.accentColor2}"/>
        <circle cx="250" cy="475" r="5" fill="${params.accentColor2}"/>
      </g>
    `;
  }

  static createAdvancedQuoteText(params, quote, width, height) {
    const fontSize = quote.length > 60 ? 16 : quote.length > 40 ? 18 : 20;
    
    return `
      <!-- Quote text background -->
      <rect x="50" y="120" width="400" height="160" 
            fill="${params.accentColor1}" 
            opacity="0.1" 
            rx="15" ry="15"
            filter="url(#softBlur)"/>
      
      <!-- Main quote text -->
      <foreignObject x="60" y="130" width="380" height="140">
        <div xmlns="http://www.w3.org/1999/xhtml" style="
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: ${fontSize}px;
          line-height: 1.5;
          color: ${params.textColor};
          text-align: center;
          padding: 20px;
          text-shadow: 2px 2px 4px ${params.textShadowColor};
          font-weight: 400;
          letter-spacing: 0.5px;
        ">
          <span style="font-size: 1.5em; color: ${params.accentColor1}; opacity: 0.7;">"</span>${quote}<span style="font-size: 1.5em; color: ${params.accentColor1}; opacity: 0.7;">"</span>
        </div>
      </foreignObject>
      
      <!-- Decorative quote marks -->
      <text x="70" y="150" font-family="Georgia, serif" font-size="40" 
            fill="${params.accentColor2}" opacity="0.3" font-weight="bold">"</text>
      <text x="430" y="250" font-family="Georgia, serif" font-size="40" 
            fill="${params.accentColor2}" opacity="0.3" font-weight="bold">"</text>
    `;
  }

  static createStylizedAuthor(params, author, width, height) {
    return `
      <!-- Author background accent -->
      <rect x="150" y="300" width="200" height="40" 
            fill="url(#accentGradient1)" 
            opacity="0.15" 
            rx="20" ry="20"/>
      
      <!-- Author text -->
      <text x="250" y="325" 
            font-family="Georgia, serif" 
            font-size="18" 
            font-style="italic" 
            fill="${params.textColor}" 
            text-anchor="middle"
            opacity="0.9"
            filter="url(#glow)">
        — ${author}
      </text>
      
      <!-- Decorative line under author -->
      <line x1="180" y1="335" x2="320" y2="335" 
            stroke="${params.accentColor2}" 
            stroke-width="1" 
            opacity="0.5"/>
    `;
  }

  static createArtisticBranding(params, width, height) {
    return `
      <!-- NFT branding background -->
      <rect x="200" y="380" width="100" height="30" 
            fill="url(#accentGradient2)" 
            opacity="0.2" 
            rx="15" ry="15"/>
      
      <!-- NFT indicator with artistic styling -->
      <text x="250" y="400" 
            font-family="Arial, sans-serif" 
            font-size="14" 
            fill="${params.accentColor1}" 
            text-anchor="middle" 
            font-weight="bold"
            opacity="0.8"
            filter="url(#glow)">
        ✦ QUOTE NFT ✦
      </text>
      
      <!-- Shimmer effect overlay -->
      <rect x="200" y="380" width="100" height="30" 
            fill="url(#shimmer)" 
            rx="15" ry="15"/>
    `;
  }

  static createFinalOverlays(params) {
    return `
      <!-- Noise overlay for texture -->
      <rect width="100%" height="100%" 
            fill="url(#noise)" 
            opacity="0.03"/>
      
      <!-- Vignette effect -->
      <rect width="100%" height="100%" 
            fill="url(#depthGradient)" 
            opacity="0.1"/>
      
      <!-- Subtle overall glow -->
      <rect width="100%" height="100%" 
            fill="none" 
            stroke="${params.accentColor1}" 
            stroke-width="1" 
            opacity="0.2"
            filter="url(#glow)"/>
    `;
  }

  static generateArtworkDataURL(quote, author) {
    const svg = this.generateUniqueArtwork(quote, author);
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    return URL.createObjectURL(blob);
  }

  static downloadArtwork(quote, author, filename = 'quote-nft-artwork.svg') {
    const svg = this.generateUniqueArtwork(quote, author);
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
} 