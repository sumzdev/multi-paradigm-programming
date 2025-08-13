import { ChapterPage } from '../../ChapterPage';
import { main } from './main';

export class Chapter5Section2 extends ChapterPage {
  override async onRender() {
    await main();
  }
}
