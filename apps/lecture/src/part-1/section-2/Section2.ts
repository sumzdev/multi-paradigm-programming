import { SectionPage } from '../../SectionPage';
import { lesson1 } from './lesson-1';
import { lesson2_1 } from './lesson-2-1';
import { lesson2_2 } from './lesson-2-2';
import { lesson2_3 } from './lesson-2-3';
import { lesson2_4 } from './lesson-2-4';
import { lesson2_5 } from './lesson-2-5';
import { lesson2_6 } from './lesson-2-6';
import { lesson2_7 } from './lesson-2-7';
import { lesson3_1 } from './lesson-3-1';
import { lesson4_2 } from './lesson-4-2';
import { lesson4_1 } from './lesson-4-1';
import { lesson5_1 } from './lesson-5-1';
import { lesson5_2 } from './lesson-5-2';
import { lesson5_3 } from './lesson-5-3';
import { lesson5_4 } from './lesson-5-4';
import { lesson5_5 } from './lesson-5-5';
import { lesson6_1 } from './lesson-6-1';

export class Section2 extends SectionPage {
  override title = 'Section2';
  override link = '/part-1/section-2';
  override lessons = [
    lesson1,
    lesson2_1,
    lesson2_2,
    lesson2_3,
    lesson2_4,
    lesson2_5,
    lesson2_6,
    lesson2_7,
    lesson3_1,
    lesson4_1,
    lesson4_2,
    lesson5_1,
    lesson5_2,
    lesson5_3,
    lesson5_4,
    lesson5_5,
    lesson6_1,
  ];
}
