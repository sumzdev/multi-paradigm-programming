import { SectionPage } from '../../SectionPage';
import { html } from 'rune-ts';
import { lesson1 } from './lesson-1';
import { lesson4 } from './lesson-4';
import { lesson5 } from './lesson-5';
import { lesson6 } from './lesson-6';
import { lesson7 } from './lesson-7';
import { lesson8 } from './lesson-8';
import { lesson9 } from './lesson-9';

const fs = [lesson1, lesson4, lesson5, lesson6, lesson7, lesson8, lesson9];

export class Section9 extends SectionPage {
  override title = 'Section9';
  override link = '/part-1/section-9';
  override lessons = fs;
}
