import { ChapterPage } from '../../ChapterPage';
import { main } from './main';

export class Chapter4Section4 extends ChapterPage {
  override async onRender() {
    await main();
  }
}
