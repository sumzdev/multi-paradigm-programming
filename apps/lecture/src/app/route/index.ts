import { createRouter } from '@rune-ts/server';
import { HomePage } from '../../HomePage';
import { Section2 as Part1Section2 } from '../../part-1/section-2/Section2';
import { Section3 as Part1Section3 } from '../../part-1/section-3/Section3';
import { Section4 as Part1Section4 } from '../../part-1/section-4/Section4';
import { Section5 as Part1Section5 } from '../../part-1/section-5/Section5';
import { Section6 as Part1Section6 } from '../../part-1/section-6/Section6';
import { Section7 as Part1Section7 } from '../../part-1/section-7/Section7';
import { Section8 as Part1Section8 } from '../../part-1/section-8/Section8';
import { Section9 as Part1Section9 } from '../../part-1/section-9/Section9';
import { Section10 as Part1Section10 } from '../../part-1/section-10/Section10';
import { Section11 as Part1Section11 } from '../../part-1/section-11/Section11';

export const ClientRouter = createRouter({
  '/': HomePage,
  '/part-1/section-2': Part1Section2,
  '/part-1/section-3': Part1Section3,
  '/part-1/section-4': Part1Section4,
  '/part-1/section-5': Part1Section5,
  '/part-1/section-6': Part1Section6,
  '/part-1/section-7': Part1Section7,
  '/part-1/section-8': Part1Section8,
  '/part-1/section-9': Part1Section9,
  '/part-1/section-10': Part1Section10,
  '/part-1/section-11': Part1Section11,
});
