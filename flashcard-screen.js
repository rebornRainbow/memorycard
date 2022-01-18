// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Rewriting some of the existing methods, such as changing code in `show()`
// - Adding methods
// - Adding additional fields

class FlashcardScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;
  }

  show(card_set_index) {
    this.containerElement.classList.remove('inactive');
    const flashcardContainer = document.querySelector('#flashcard-container');
    //记录本次的单词集合
    this.words = FLASHCARD_DECKS[card_set_index]['words'];
    this.key = Object.keys(this.words);
    this.cur_card_index = 0;
    const card = new Flashcard(flashcardContainer, this.key[this.cur_card_index], 
      this.words[this.key[this.cur_card_index]]);
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }
}
