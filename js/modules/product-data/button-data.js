
// class for input buttons with any data change


class btnsClass{
  constructor(
    dataToChange,
    bootColors
    ) {
    this.properties = {
      data: [...dataToChange],
      bootColors: [...bootColors]
    }
  }
}

const btnsColor = new btnsClass(
  ['blue', 'green', 'red'],
  ['primary', 'success', 'danger']
);

const btnsSize = new btnsClass(
  ['s', 'm', 'l'],
  ['secondary']
);

const btnsQuantity = new btnsClass(
  [1, 0],
  ['secondary']
);


export {btnsClass, btnsColor, btnsSize, btnsQuantity};