class GridController < ApplicationController
  Slot = Struct.new(:row, :col, :span, :id)

  def edit
    @grid = grid
  end

  def grid
    Enumerator.product(0.upto(2), 0.upto(19)).reduce({}) do |acc, (row, col)|
      next acc if row == 1 && [ 9, 10, 11 ].include?(col)

      acc["#{row}-#{col}"] = Slot.new(row:, col:, span: row == 1 && col == 8 ? 4 : 1, id: "#{row}-#{col}")
      acc
    end
  end
  helper_method :grid
end
