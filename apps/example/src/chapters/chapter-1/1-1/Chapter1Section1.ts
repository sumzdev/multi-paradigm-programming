import { ChapterPage } from '../../ChapterPage';
import { main } from './main';

export class Chapter1Section1 extends ChapterPage {
  override onRender() {
    main();
  }
}
