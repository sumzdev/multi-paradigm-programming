import { SectionPage } from '../../SectionPage';
import { lesson1_1 } from './lesson-1-1';
import { lesson1_2 } from './lesson-1-2';
import { lesson1_3 } from './lesson-1-3';
import { lesson2 } from './lesson-2';
import { lesson3 } from './lesson-3';
import { lesson4_1 } from './lesson-4-1';
import { lesson4_2 } from './lesson-4-2';
import { lesson4_3 } from './lesson-4-3';

const fs = [lesson1_1, lesson1_2, lesson1_3, lesson2, lesson3, lesson4_1, lesson4_2, lesson4_3];

export class Section4 extends SectionPage {
  override title = 'Section4';
  override link = '/part-1/section-4';
  override lessons = fs;
}
