import { SectionPage } from '../../SectionPage';
import { html } from 'rune-ts';
import {lesson2} from "./lesson-2";
import {lesson3} from "./lesson-3";

const fs = [
  lesson2,
  lesson3,
];

export class Section7 extends SectionPage {
  override title = 'Section7';
  override link = '/part-1/section-7';
  override lessons = fs;
}
