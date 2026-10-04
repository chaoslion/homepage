// @ts-expect-error MathJax
import MathJax from 'mathjax';

export const MathInlineAsciiMathPrefix = 'ascii:';

const marcosSIPrefixes = {
  pico: '{\\text{p}}',
  nano: '{\\text{n}}',
  micro: '{\\mu}',
  milli: '{\\text{m}}',
  centi: '{\\text{c}}',
  kilo: '{\\text{k}}',
  mega: '{\\text{M}}',
  giga: '{\\text{G}}',
  tera: '{\\text{T}}',
};

const macrosUnits = {
  amp: '{\\text{A}}',
  bit: '{\\text{Bit}}',
  bps: '{\\text{bps}}',
  byte: '{\\text{B}}',
  celsius: '{{^\\circ\\text{C}}}',
  coulomb: '{\\text{C}}',
  dB: '{\\text{dB}}',
  dBm: '{\\text{dBm}}',
  degC: '{{^\\circ\\text{C}}}',
  degF: '{{^\\circ\\text{F}}}',
  fahrenheit: '{{^\\circ\\text{F}}}',
  farad: '{\\text{F}}',
  henry: '{\\text{H}}',
  hour: '{\\text{h}}',
  hz: '{\\text{Hz}}',
  kelvin: '{\\text{K}}',
  meter: '{\\text{m}}',
  minute: '{\\text{min}}',
  ohm: '{\\Omega}',
  percent: '{\\text{%}}',
  samples: '{\\text{Sa}}',
  sec: '{\\text{s}}',
  siemens: '{\\text{S}}',
  va: '{\\text{VA}}',
  var: '{\\text{var}}',
  volt: '{\\text{V}}',
  watt: '{\\text{W}}',
};

export async function renderMathJax(
  ctx: any,
  value: string,
  displayBlock: boolean,
  useAsciiMath: boolean = false,
): Promise<string> {
  ctx.data.mathJaxReady ??= MathJax.init({
    output: {
      linebreaks: {
        inline: false,
      },
    },
    loader: {
      load: ['input/tex', 'input/asciimath', 'output/svg', '[tex]/units'],
    },
    tex: {
      packages: { '[+]': ['units'] },
      macros: {
        ...marcosSIPrefixes,
        ...macrosUnits,
        unitsrangeDE: ['\\units[#1]{#3}\\text{ bis }\\units[#2]{#3}', 3],
        unitsrange: ['\\units[#1]{#3}\\text{ to }\\units[#2]{#3}', 3],
      },
      units: {
        loose: false,
        ugly: false,
      },
    },
  });
  await ctx.data.mathJaxReady;

  const adaptor = MathJax.startup.adaptor;
  const factory = useAsciiMath
    ? MathJax.asciimath2svgPromise
    : MathJax.tex2svgPromise;

  const mathNode: HTMLElement = await factory(value, {
    display: displayBlock,
  });
  return adaptor.serializeXML(mathNode);
}
