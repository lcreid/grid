class GridController < ApplicationController
  def edit; end

  def grid
    helpers.tag.div(class: "grid") do
      Enumerator.product(0.upto(2), 0.upto(9)).map do |row_num, col_num|
        helpers.tag.div("#{row_num}-#{col_num}", class: "grid-cell")
      end.join
    end
  end
  helper_method :grid
end
