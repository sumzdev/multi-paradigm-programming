import { SectionPage } from '../../SectionPage';
import { html } from 'rune-ts';
import { lesson1 } from './lesson-1';
import { lesson2 } from './lesson-2';
import { lesson3 } from './lesson-3';

const fs = [lesson1, lesson2, lesson3];

export class Section10 extends SectionPage {
  override title = 'Section10';
  override link = '/part-1/section-10';
  override lessons = fs;
}
