from pathlib import Path
from html.parser import HTMLParser
import re
p = Path(__file__).resolve().parents[1]
class Parser(HTMLParser):
    def __init__(self):
        super().__init__(); self.ids=[]; self.scripts=[]; self.topics=[]; self.copy=[]; self.hidden=[]; self.selects=0; self.steps=[]
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if 'id' in a:
            self.ids.append(a['id'])
            if 'hidden' in a: self.hidden.append(a['id'])
        if tag == 'script': self.scripts.append(a['src'])
        if tag == 'select': self.selects+=1
        if 'data-page' in a:
            assert tag=='button' and a['type']=='button'
            self.steps.append(a['data-page'])
        if 'data-topic' in a:
            assert tag=='button' and a['type']=='button' and a['aria-pressed']=='false'
            self.topics.append(a['data-topic'])
        if 'data-copy' in a:self.copy.append(a['data-copy'])
h=Parser();h.feed((p/'index.html').read_text())
assert len(h.ids)==len(set(h.ids))
assert {'birth-page','nature-page','season-page'}<=set(h.ids)
assert {'nature-page','season-page'}<=set(h.hidden) and 'birth-page' not in h.hidden
assert h.selects==0
assert h.steps==['birth','nature','season']
assert 'export-pdf' in h.ids and 'print-report' in h.ids
assert h.topics==['health','love','family','career','study','wealth']
js=(p/'app.js').read_text()
refs=set(re.findall(r"\$\('([^']+)'\)",js))
assert refs<=set(h.ids), refs-set(h.ids)
for src in h.scripts:assert (p/src).is_file()
assert h.scripts==['vendor/lunar.js','topics.js','oracle.js','app.js']
for key in h.copy:assert len(re.findall(r'\b'+re.escape(key)+r':',js))==2, key
assert 'Three questions to sit with' not in js
assert 'What do you know for certain' not in js
assert 'There is no clear month' not in js
assert 'window.print()' in js
css=(p/'style.css').read_text()
assert '@media print' in css and 'body.print-ready' in css
print('Passed: three-page structure, six accessible topic buttons, no direction dropdown, bilingual labels, references and script order.')
