import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace <div class="hero-glass-card"> with nothing (and update container)
html = html.replace('<div class="hero-content container">\n                <div class="hero-glass-card">', '<div class="hero-content cinematic-content container text-center">')

# Replace the closing </div> of hero-glass-card
# Notice: the pattern is exactly 3 closing divs in a row for the slide.
# We will match the end of the slide up to the next slide or the controls.
html = re.sub(r'</a>\s*</div>\s*</div>\s*</div>', '</a>\n            </div>\n        </div>', html)
html = re.sub(r'</p>\s*</div>\s*</div>\s*</div>', '</p>\n            </div>\n        </div>', html) # In case a slide has no button

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
