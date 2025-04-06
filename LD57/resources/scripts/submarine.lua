-- How long it takes in seconds for inputs to be received by the submarine.
latency = 0.0
max_latency = 2
latency_progress = 0.0001

-- Speed of the submarine along both axis.
horizontal_speed = 8.0
vertical_speed = 2.0

local input_buffer = {}
local time = 0.0
local next_ping = 5.0

local arrow_up
local arrow_down
local arrow_left
local arrow_right

local start_pos = juice.vec2.new(0, 0)
game_over = false
started = false
local no_move_time = 0.0

function start()
    start_pos = juice.vec2.new(entity.transform.position)
    entity.physics.on_physics_update = on_physics
    entity.physics_box.on_collision_start = on_collision

    arrow_up = entity:find_child("arrow_up")
    arrow_down = entity:find_child("arrow_down")
    arrow_left = entity:find_child("arrow_left")
    arrow_right = entity:find_child("arrow_right")
end

function on_collision(_, other)
    if other.parent.name == "tilemap" then
        if not game_over and on_game_over ~= nil then
            game_over = true
            on_game_over()
        end
    end
end

function on_physics(delta)
    local pos = entity.transform.position
    latency = juice.vec2.new(start_pos.x - pos.x, start_pos.y - pos.y):length() * latency_progress

    -- Keep track of time.
    time = time + delta
    no_move_time = no_move_time + delta
    local input_time = time + latency

    if time > next_ping and not game_over then
        next_ping = time + 5.0
        entity.audio.pitch = 1.0 + (math.random() - 0.5) * 0.1
        entity.audio:play()

        juice.routine.create(function()
            juice.routine.wait_seconds_func(5.0, function(x)
                entity.transform.scale = juice.vec2.new(
                    1 + juice.ease.in_elastic(1 - x) * 0.5,
                    1 + juice.ease.in_elastic(1 - x) * 0.5
                )
            end)
        end)
    end

    -- Store inputs in buffer to be delayed.
    if juice.input.is_key_held("a") or juice.input.is_key_held("left") then
        table.insert(input_buffer, { receive = input_time, cmd = "left"} )
    elseif juice.input.is_key_held("d") or juice.input.is_key_held("right") then
        table.insert(input_buffer, { receive = input_time, cmd = "right"})
    elseif juice.input.is_key_held("w") or juice.input.is_key_held("up") then
        table.insert(input_buffer, { receive = input_time, cmd = "up"})
    elseif juice.input.is_key_held("s") or juice.input.is_key_held("down") then
        table.insert(input_buffer, { receive = input_time, cmd = "down"})
    end

    arrow_up.sprite.color.a = 0
    arrow_down.sprite.color.a = 0
    arrow_left.sprite.color.a = 0
    arrow_right.sprite.color.a = 0

    -- If there is an item in the input buffer, try to process it.
    if #input_buffer > 0 then
        started = true
        no_move_time = 0.0
        if input_buffer[1].receive <= time then
            local cmd = input_buffer[1].cmd

            -- Process command.
            if cmd == "left" then
                entity.physics:add_force(juice.vec2.new(-horizontal_speed, 0))
                arrow_left.sprite.color.a = 1
            elseif cmd == "right" then
                entity.physics:add_force(juice.vec2.new(horizontal_speed, 0))
                arrow_right.sprite.color.a = 1
            elseif cmd == "up" then
                entity.physics:add_force(juice.vec2.new(0, vertical_speed))
                arrow_up.sprite.color.a = 1
            elseif cmd == "down" then
                entity.physics:add_force(juice.vec2.new(0, -vertical_speed))
                arrow_down.sprite.color.a = 1
            end

            -- Remove the command.
            table.remove(input_buffer, 1)
        end
    end

    if no_move_time > 10.0 then
        arrow_up.sprite.color.a = math.floor((time * 4) % 2)
        arrow_down.sprite.color.a = math.floor((time * 4) % 2)
        arrow_left.sprite.color.a = math.floor((time * 4) % 2)
        arrow_right.sprite.color.a = math.floor((time * 4) % 2)
    end
end