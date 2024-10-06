local time = 0

local bunny_data = {
    [1] = {
        hop_distance = 8.0,
        hop_height = 8.0,
        hop_duration = 0.5,
        hop_wait_min = 1.0,
        hop_wait_max = 2.5,
        sprite_row = 1,
    },
    [2] = {
        hop_distance = 8.0,
        hop_height = 16.0,
        hop_duration = 0.5,
        hop_wait_min = 1.0,
        hop_wait_max = 2.0,
        sprite_row = 3,
    },
    [3] = {
        hop_distance = 16.0,
        hop_height = 16.0,
        hop_duration = 0.5,
        hop_wait_min = 1.0,
        hop_wait_max = 2.0,
        sprite_row = 10,
    },
    [4] = {
        hop_distance = 32.0,
        hop_height = 8.0,
        hop_duration = 0.5,
        hop_wait_min = 0.5,
        hop_wait_max = 2.0,
        sprite_row = 2,
    },
    [5] = {
        hop_distance = 16.0,
        hop_height = 32.0,
        hop_duration = 1.0,
        hop_wait_min = 0.0,
        hop_wait_max = 1.0,
        sprite_row = 12,
    },
    [6] = {
        hop_distance = 32.0,
        hop_height = 8.0,
        hop_duration = 0.25,
        hop_wait_min = 1.0,
        hop_wait_max = 3.0,
        sprite_row = 5,
    },
}

bunny_number = 0
local bunny = nil
local captured = false

local hats = 0

function start()
    juice.routine.create(function()
        if bunny_number == 0 then
            juice.trace("creating random bunny")
            bunny = bunny_data[math.random(#bunny_data)]
        else
            bunny = bunny_data[bunny_number]
        end
        entity.sprite.origin = juice.vec2.new(0, 256 - (16 * bunny.sprite_row))
        entity.transform.position.z = -10
        while not captured do
            local start_pos = juice.vec2.new(entity.transform.position.x, entity.transform.position.y)
            juice.routine.wait_seconds_func(bunny.hop_duration, function(x)
                if captured then
                    return
                end
                entity.transform.position = juice.vec3.new(
                    start_pos.x + bunny.hop_distance * x,
                    start_pos.y + bunny.hop_height * math.sin(x * math.pi),
                    entity.transform.position.z
                )
                if (x < 0.5) then
                    entity.sprite.origin.x = 16
                else
                    entity.sprite.origin.x = 32
                end
            end)
            entity.sprite.origin.x = 0
            local wait_hop = juice.math.lerp(bunny.hop_wait_min, bunny.hop_wait_max, math.random())
            juice.routine.wait_seconds(wait_hop)
        end
    end)
end

function set_hats(count)
    local parent = entity:find_child("hat_attach")
    local depth_offset = 31
    for i = 1, count do
        local hat = spawn("prefabs/hat.jbprefab")
        hat.name = "hat" .. tostring(i)
        hat:set_parent(parent)
        hat.transform.position = juice.vec3.new(0, 0, depth_offset)

        -- Next parent is the new hat
        parent = hat:find_child("attach")
    end
    hats = count
end

--Call to capture the bunny.
function capture()
    -- Lose hat if caught.
    if hats > 0 then
        local hat = entity:find_child("hat" .. tostring(hats))
        hat.scripts.hat.lose_hat()
        hats = hats - 1
    elseif not captured then
        captured = true
        entity:add_component("line")
        entity.line["local"] = false
        entity.line.points:add(juice.line_element.new(juice.vec2.new(0, 0), 4))
        entity.line.points:add(juice.line_element.new(juice.vec2.new(0, -256), 4))
        entity.line.texture = juice.resources:load_texture("sprites/rope.png")

        entity.sprite.origin.x = 48

        local start_pos = juice.vec2.new(entity.transform.position.x, entity.transform.position.y)
        juice.routine.create(function()
            juice.routine.wait_seconds_func(1.0, function(x)
                entity.sprite.origin.x = 48
                entity.transform.position = juice.vec3.new(
                    juice.math.lerp(start_pos.x, 0, juice.ease.in_expo(x)),
                    juice.math.lerp(start_pos.y, -256, juice.ease.in_expo(x)),
                    entity.transform.position.z
                )
            end)
        end)
    end
end

function update()
    if captured then
        if entity:has_component("physics_circle") then
            entity:remove_component("physics_circle")
        end
        entity.line.points[1].position = juice.vec2.new(entity.transform.position.x + 1, entity.transform.position.y - 4)
    end
end