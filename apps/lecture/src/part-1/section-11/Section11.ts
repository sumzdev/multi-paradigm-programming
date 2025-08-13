import { SectionPage } from '../../SectionPage';
import { lesson1 } from './lesson-1';
import { lesson2 } from './lesson-2';
import { lesson1_2 } from './lesson-1-2';
import { lesson1_3 } from './lesson-1-3';
import { lesson1_4 } from './lesson-1-4';

export class Section11 extends SectionPage {
  override title = 'Section11';
  override link = '/part-1/section-11';
  override lessons = [lesson1, lesson1_2, lesson1_3, lesson1_4, lesson2];
}
