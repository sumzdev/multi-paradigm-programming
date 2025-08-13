import { SectionPage } from '../../SectionPage';
import { lesson1_1 } from './lesson-1-1';
import { lesson1_2 } from './lesson-1-2';
import { lesson2 } from './lesson-2';
import { lesson3 } from './lesson-3';

export class Section3 extends SectionPage {
  override title = 'Section3';
  override link = '/part-1/section-3';
  override lessons = [lesson1_1, lesson1_2, lesson2, lesson3];
}
