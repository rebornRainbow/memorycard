// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Changing the code in the constructor
// - Adding methods
// - Adding additional fields

class App {
  constructor() {

    //绑定函数
    this.click_choices = this.click_choices.bind(this);
    this.click_choices_event = this.click_choices_event.bind(this);
    this.change_to_res = this.change_to_res.bind(this);
    this.continue_card = this.continue_card.bind(this);

    const menuElement = document.querySelector('#menu');
    this.menu = new MenuScreen(menuElement);
    
    const mainElement = document.querySelector('#main');
    this.flashcards = new FlashcardScreen(mainElement);

    document.addEventListener('change_to_res',this.change_to_res);
    document.addEventListener('continue_card',this.continue_card);

    const resultElement = document.querySelector('#results');
    this.results = new ResultsScreen(resultElement);

    this.click_choices();
    // Uncomment this pair of lines to see the "flashcard" screen:
    // this.menu.hide();
    // this.flashcards.show();

    // Uncomment this pair of lines to see the "results" screen:
    // this.menu.hide();
    // this.results.show();
  }


  continue_card()
  {
    this.results.hide();
    this.flashcards.show(0,true);
  }

  change_to_res()
  {
    let tem = this.flashcards.hide();
    this.results.show();
  }
  //菜单里面的元素加上监听事件
  click_choices()
  {
    let click_items = document.querySelectorAll('#choices div');
    for(let item of click_items)
    {
      item.addEventListener('click',this.click_choices_event);
    }
  }
  
  click_choices_event(event)
  {
    let elem = event.currentTarget;
    let card_set_index = elem.dataset.index;
    this.menu.hide();
    this.flashcards.show(card_set_index,false);
  }

}
