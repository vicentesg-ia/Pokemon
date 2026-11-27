import {Config} from '@remotion/cli/config';
// En el entorno cloud, Remotion no puede descargar su navegador: usamos el de Playwright.
Config.setBrowserExecutable(process.env.REMOTION_CHROME ?? '/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell');
Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
