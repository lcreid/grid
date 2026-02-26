import { Controller } from "@hotwired/stimulus"

class Point {
  /**
   * Creates an instance of Point.
   * @param {number} row - The horizontal coordinate.
   * @param {number} col - The vertical coordinate.
   */
  constructor(row, col) {
    this.row = Number(row);
    this.col = Number(col);
  }
}

class Rectangle {
  /**
   * Creates an instance of Rectangle.
   * @param {Point} topLeft
   * @param {Point} bottomRight
   */
  constructor(topLeft, bottomRight) {
    this.topLeft = topLeft;
    this.bottomRight = bottomRight;
  }
}

// Connects to data-controller="grid-cell"
export default class extends Controller {
  connect() {
  }

  click(event) {
    console.log(`Clicked: ${event}`)
    if (event.shiftKey) {
      const selected = [...this.selected()]
      const selected_points = selected.map(element => this.id_to_point(element.id))

      this.unselectAll()

      let top = Math.min(...selected_points.map(point => point.row))
      let left = Math.min(...selected_points.map(point => point.col))
      let bottom = Math.max(...selected_points.map(point => point.row))
      let right = Math.max(...selected_points.map(point => point.col))

      const clicked = this.id_to_point(this.element.id)

      if (clicked.row < top) { top = clicked.row }
      else { bottom = clicked.row }

      if (clicked.col < left) { left = clicked.col }
      else { right = clicked.col }

      for (let row = top; row <= bottom; row++) {
        for (let col = left; col <= right; col++) {
          const id = this.point_to_id(new Point(row, col))
          document.getElementById(id)?.classList.add('selected')
        }
      }
    } else {
      this.unselectAll()
      this.select(this.element)
    }
  }

  id_to_point(id) {
    return new Point(...id.split('-'))
  }

  point_to_id(point) {
    return `${point.row}-${point.col}`
  }

  select(element) {
    element.classList.add('selected')
  }

  selected() {
    return document.querySelectorAll('.grid-cell.selected')
  }

  unselectAll() {
    this.selected()?.forEach(element => {
      element.classList?.remove('selected')
    });
  }
}
