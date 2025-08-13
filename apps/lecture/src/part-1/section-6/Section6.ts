import { SectionPage } from '../../SectionPage';
import { html } from 'rune-ts';
import { lesson2_1 } from './lesson-2-1';
import { lesson2_2 } from './lesson-2-2';
import { lesson3_1 } from './lesson-3-1';
import { lesson3_2 } from './lesson-3-2';
import { lesson3_3 } from './lesson-3-3';
import { lesson4 } from './lesson-4';
import { lesson5 } from './lesson-5';

const fs = [lesson2_1, lesson2_2, lesson3_1, lesson3_2, lesson3_3, lesson4, lesson5];

export class Section6 extends SectionPage {
  override title = 'Section6';
  override link = '/part-1/section-6';
  override lessons = fs;
}
