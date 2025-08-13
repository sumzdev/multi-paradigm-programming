import { createRouter } from '@rune-ts/server';
import { Chapter1Section1 } from '../../chapters/chapter-1/1-1/Chapter1Section1';
import { Chapter1Section2 } from '../../chapters/chapter-1/1-2/Chapter1Section2';
import { Chapter1Section3 } from '../../chapters/chapter-1/1-3/Chapter1Section3';
import { Chapter1Section4 } from '../../chapters/chapter-1/1-4/Chapter1Section4';
import { Chapter1Section5 } from '../../chapters/chapter-1/1-5/Chapter1Section5';
import { Chapter2Section1 } from '../../chapters/chapter-2/2-1/Chapter2Section1';
import { Chapter2Section2 } from '../../chapters/chapter-2/2-2/Chapter2Section2';
import { Chapter2Section3 } from '../../chapters/chapter-2/2-3/Chapter2Section3';
import { Chapter3Section1 } from '../../chapters/chapter-3/3-1/Chapter3Section1';
import { Chapter3Section3 } from '../../chapters/chapter-3/3-3/Chapter3Section3';
import { Chapter3Section4 } from '../../chapters/chapter-3/3-4/Chapter3Section4';
import { Chapter4Section1 } from '../../chapters/chapter-4/4-1/Chapter4Section1';
import { Chapter4Section2 } from '../../chapters/chapter-4/4-2/Chapter4Section2';
import { Chapter4Section3 } from '../../chapters/chapter-4/4-3/Chapter4Section3';
import { Chapter4Section4 } from '../../chapters/chapter-4/4-4/Chapter4Section4';
import { Chapter5Section1 } from '../../chapters/chapter-5/5-1/Chapter5Section1';
import { Chapter5Section2 } from '../../chapters/chapter-5/5-2/Chapter5Section2';
import { Chapter5Section3 } from '../../chapters/chapter-5/5-3/Chapter5Section3';
import { Chapter5Section4 } from '../../chapters/chapter-5/5-4/Chapter5Section4';
import { Chapter6Section1 } from '../../chapters/chapter-6/6-1/Chapter6Section1';
import { Chapter6Section2 } from '../../chapters/chapter-6/6-2/Chapter6Section2';
import { Chapter7Section1 } from '../../chapters/chapter-7/7-1/Chapter7Section1';
import { Chapter7Section234 } from '../../chapters/chapter-7/7-2_3_4/Chapter7Section234';
import { Chapter7Section5 } from '../../chapters/chapter-7/7-5/Chapter7Section5';
import { Chapter7Section52 } from '../../chapters/chapter-7/7-5/Chapter7Section52';
import { HomePage } from '../../chapters/HomePage';

export const ClientRouter = createRouter({
  '/': HomePage,
  '/1-1': Chapter1Section1,
  '/1-2': Chapter1Section2,
  '/1-3': Chapter1Section3,
  '/1-4': Chapter1Section4,
  '/1-5': Chapter1Section5,
  '/2-1': Chapter2Section1,
  '/2-2': Chapter2Section2,
  '/2-3': Chapter2Section3,
  '/3-1': Chapter3Section1,
  '/3-3': Chapter3Section3,
  '/3-4': Chapter3Section4,
  '/4-1': Chapter4Section1,
  '/4-2': Chapter4Section2,
  '/4-3': Chapter4Section3,
  '/4-4': Chapter4Section4,
  '/5-1': Chapter5Section1,
  '/5-2': Chapter5Section2,
  '/5-3': Chapter5Section3,
  '/5-4': Chapter5Section4,
  '/6-1': Chapter6Section1,
  '/6-2': Chapter6Section2,
  '/7-1': Chapter7Section1,
  '/7-234': Chapter7Section234,
  '/7-5': Chapter7Section5,
  '/7-5-2': Chapter7Section52,
});
