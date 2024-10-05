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
        hop_wait_min = 2.0,
        hop_wait_max = 4.0,
        sprite_row = 2,
    },
}

local bunny = {}
local captured = false

local hats = 0

function start()

    bunny = bunny_data[math.random(#bunny_data)]

    juice.routine.create(function()
        entity.sprite.origin = juice.vec2.new(0, 256 - (16 * bunny.sprite_row))
        set_hats(math.random(0, 3))
        while true do
            local start_pos = juice.vec2.new(entity.transform.position.x, entity.transform.position.y)
            juice.routine.wait_seconds_func(bunny.hop_duration, function(x)
                entity.transform.position = juice.vec3.new(
                start_pos.x + bunny.hop_distance * x,
                start_pos.y + bunny.hop_height * math.sin(x * math.pi), 0
                )
                if (x < 0.5) then
                    entity.sprite.origin.x = 16
                else
                    entity.sprite.origin.x = 32
                end
            end)
            entity.sprite.origin.x = 0
            juice.routine.wait_seconds(math.random() * bunny.hop_wait_max - bunny.hop_wait_min)
        end
    end)
end

function set_hats(count)
    local parent = entity:find_child("hat_attach")
    for i = 1, count do
        local hat = spawn("prefabs/hat.jbprefab")
        hat.name = "hat" .. tostring(i)
        hat:set_parent(parent)
        hat.transform.position = juice.vec3.new()

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
    else
        captured = true
    end
end

function update()
    if captured then
        destroy_entity(entity)
    end
end