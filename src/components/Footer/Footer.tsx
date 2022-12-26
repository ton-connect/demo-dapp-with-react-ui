import {Locales, Theme, THEME, useTonConnectUI} from "@tonconnect/ui-react";
import './footer.scss';

export const Footer = () => {
    const [_, setOptions] = useTonConnectUI();

    const onLangChange = (lang: string) => {
        setOptions({ language: lang as Locales })
    }

    const onThemeChange = (theme: string) => {
        setOptions({ theme: theme as Theme })
    }

    return <footer className="footer">
        <div>
            <label>language</label>
            <select onChange={e => onLangChange(e.target.value)}>
                <option value="en">en</option>
                <option value="ru">ru</option>
            </select>
        </div>

        <div>
            <label>theme</label>
            <select onChange={e => onThemeChange(e.target.value)}>
                <option value={THEME.DARK}>dark</option>
                <option value={THEME.LIGHT}>light</option>
                <option value="SYSTEM">system</option>
            </select>
        </div>
    </footer>
}
