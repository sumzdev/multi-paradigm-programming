import { SectionPage } from '../../SectionPage';
import { html } from 'rune-ts';
import { lesson1_1 } from './lesson-1-1';
import { lesson1_2 } from './lesson-1-2';
import { lesson2_1 } from './lesson-2-1';
import { lesson2_2 } from './lesson-2-2';
import { lesson2_3 } from './lesson-2-3';
import { lesson3_1 } from './lesson-3-1';
import { lesson3_2 } from './lesson-3-2';
import { lesson3_3 } from './lesson-3-3';
import { lesson4 } from './lesson-4';

const fs = [
  lesson1_1,
  lesson1_2,
  lesson2_1,
  lesson2_2,
  lesson2_3,
  lesson3_1,
  lesson3_2,
  lesson3_3,
  lesson4,
];

export class Section5 extends SectionPage {
  override title = 'Section5';
  override link = '/part-1/section-5';
  override lessons = fs;
}
