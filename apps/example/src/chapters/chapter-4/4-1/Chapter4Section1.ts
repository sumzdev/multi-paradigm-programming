import { ChapterPage } from '../../ChapterPage';
import { main } from './main';

export class Chapter4Section1 extends ChapterPage {
  override async onRender() {
    await main();
  }
}
