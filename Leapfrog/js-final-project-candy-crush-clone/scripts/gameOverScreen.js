export function SomeObject() {
  this.list = [1, 2, 3];

  this.printList = () => {
    console.log(this.list);
  };
}
