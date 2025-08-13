import { ChapterPage } from '../../ChapterPage';
import { main as todo } from './todo';
import { main as setting } from './setting';

export class Chapter7Section234 extends ChapterPage {
  override onRender() {
    todo();
    setting();
  }
}
