function start()
    find_entity("play_level_1_button").scripts.button.on_click = function()
        load_scene("scenes/game.jbscene")
    end
    find_entity("play_level_2_button").scripts.button.on_click = function()
        load_scene("scenes/game.jbscene")
    end
    find_entity("play_level_3_button").scripts.button.on_click = function()
        load_scene("scenes/game.jbscene")
    end
end