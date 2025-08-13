import { SectionPage } from '../../SectionPage';
import { html } from 'rune-ts';
import { lesson1 } from './lesson-1';
import { lesson3 } from './lesson-3';
import { lesson4 } from './lesson-4';

const fs = [lesson1, lesson3, lesson4];

export class Section8 extends SectionPage {
  override title = 'Section8';
  override link = '/part-1/section-8';
  override lessons = fs;
}
