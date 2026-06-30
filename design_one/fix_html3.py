with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

start_idx = html.find('<!-- Slide 1')
end_idx = html.find('<!-- Stats Counter Section -->')

if start_idx != -1 and end_idx != -1:
    hero_section = html[start_idx:end_idx]
    
    # 1. Replace opening glass-card and container
    hero_section = hero_section.replace(
        '<div class="hero-content container">\n                <div class="hero-glass-card">', 
        '<div class="hero-content cinematic-content container text-center">'
    )
    
    # 2. Replace closing glass-card divs properly by splitting on '<!-- Slide'
    slides = hero_section.split('<!-- Slide')
    for i in range(1, len(slides)):
        if 'class="hero-slide"' in slides[i]:
            # Replace exactly the sequence of 3 closing divs with 2 closing divs at the end of the slide content
            # The slide content ends before the next slide or the controls.
            slides[i] = slides[i].replace('</a>\n                </div>\n            </div>\n        </div>', '</a>\n            </div>\n        </div>')
            slides[i] = slides[i].replace('</p>\n                </div>\n            </div>\n        </div>', '</p>\n            </div>\n        </div>')
            
    hero_section = '<!-- Slide'.join(slides)
    
    # 3. Replace controls
    controls_start = hero_section.find('<!-- Slide-up Slider Controls -->')
    canvas_end = hero_section.find('</canvas>') + 9
    
    if controls_start != -1 and canvas_end != -1:
        old_controls = hero_section[controls_start:canvas_end]
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
        
        hero_section = hero_section.replace(old_controls, new_controls)

    html = html[:start_idx] + hero_section + html[end_idx:]

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
