import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Remove the hero-glass-card divs
html = html.replace('<div class="hero-glass-card">\n', '')
html = re.sub(r'\s*</div>\n\s*</div>\n\s*</div>', '\n            </div>\n        </div>', html)

# Modify hero-content container to center text
html = html.replace('<div class="hero-content container">', '<div class="hero-content cinematic-content container text-center">')

# Replace the slide-up-controls
controls_pattern = r'<!-- Slide-up Slider Controls -->.*?<canvas id="particle-canvas"></canvas>'
new_controls = """<!-- Cinematic Navigation -->
        <div class="cinematic-nav">
            <div class="cinematic-nav-prev" id="cinematic-prev">
                <i data-lucide="arrow-left"></i>
                <div class="nav-text">
                    <span class="nav-label">PREV</span>
                    <span class="nav-title" id="prev-company-name">COMPANY</span>
                </div>
            </div>
            <div class="cinematic-nav-next" id="cinematic-next">
                <div class="nav-text text-right">
                    <span class="nav-label">NEXT</span>
                    <span class="nav-title" id="next-company-name">COMPANY</span>
                </div>
                <i data-lucide="arrow-right"></i>
            </div>
        </div>
        <canvas id="particle-canvas"></canvas>"""

html = re.sub(controls_pattern, new_controls, html, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

