class SpinnerManager {
  currentState: boolean = $state(true);

  hide() {
    this.currentState = false;
  }
  show() {
    this.currentState = true;
  }
}

export const spinnerManager = new SpinnerManager();
