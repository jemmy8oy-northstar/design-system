import { useEffect, useState } from 'react';
import { Badge, Button, Card, Input } from '../src';

type Theme = 'casual' | 'professional';
type Mode = 'light' | 'dark';

const THEMES: Theme[] = ['casual', 'professional'];
const MODES: Mode[] = ['light', 'dark'];

/** Read `?theme=&mode=` so Playwright can screenshot each combination deterministically. */
function initialFromUrl(): { theme: Theme; mode: Mode } {
  const p = new URLSearchParams(window.location.search);
  const theme = p.get('theme') as Theme | null;
  const mode = p.get('mode') as Mode | null;
  return {
    theme: theme && THEMES.includes(theme) ? theme : 'casual',
    mode: mode && MODES.includes(mode) ? mode : 'light',
  };
}

export function Showcase() {
  const start = initialFromUrl();
  const [theme, setTheme] = useState<Theme>(start.theme);
  const [mode, setMode] = useState<Mode>(start.mode);

  // The theme/mode live on the root, so the whole page (including the toolbar) re-skins.
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    root.setAttribute('data-mode', mode);
  }, [theme, mode]);

  return (
    <div className="sc-page">
      <header className="sc-toolbar">
        <div className="sc-brand">
          Northstar <span>Design System</span>
        </div>
        <div className="sc-switches">
          <label>
            Theme
            <select value={theme} onChange={(e) => setTheme(e.target.value as Theme)}>
              {THEMES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMode((m) => (m === 'light' ? 'dark' : 'light'))}
          >
            {mode === 'light' ? '☾ Dark' : '☀ Light'}
          </Button>
        </div>
      </header>

      <main className="sc-main" data-testid="showcase">
        <section className="sc-section">
          <h2>Buttons</h2>
          <div className="sc-row">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="primary" disabled>
              Disabled
            </Button>
          </div>
          <div className="sc-row">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </section>

        <section className="sc-section">
          <h2>Badges</h2>
          <div className="sc-row">
            <Badge tone="neutral">Neutral</Badge>
            <Badge tone="primary">Primary</Badge>
            <Badge tone="success">On track</Badge>
            <Badge tone="warning">Due soon</Badge>
            <Badge tone="danger">Overdue</Badge>
          </div>
        </section>

        <section className="sc-section">
          <h2>Inputs</h2>
          <div className="sc-stack">
            <Input placeholder="Your name" />
            <Input placeholder="Focused example" defaultValue="Reading in progress" />
            <Input placeholder="Invalid" invalid defaultValue="not-an-email" />
            <Input placeholder="Disabled" disabled />
          </div>
        </section>

        <section className="sc-section">
          <h2>Cards</h2>
          <div className="sc-grid">
            <Card>
              <h3>Daily streak</h3>
              <p className="sc-muted">You've logged your habits 12 days in a row.</p>
              <div className="sc-row">
                <Badge tone="success">12 days</Badge>
                <Button size="sm" variant="secondary">
                  Log today
                </Button>
              </div>
            </Card>
            <Card interactive>
              <h3>Trip to Lisbon</h3>
              <p className="sc-muted">3 of 4 friends have voted on dates.</p>
              <div className="sc-row">
                <Badge tone="warning">Voting</Badge>
                <Badge tone="neutral">Aug 2026</Badge>
              </div>
            </Card>
            <Card elevation="flat">
              <h3>Flat card</h3>
              <p className="sc-muted">Hairline border, no shadow — for quiet groupings.</p>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
