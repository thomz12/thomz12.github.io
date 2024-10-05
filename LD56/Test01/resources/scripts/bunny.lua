local time = 0

hop_distance = 16.0
hop_height = 16.0

hop_duration = 0.5
hop_wait_min = 0.5
hop_wait_max = 1.5

function start()
    juice.routine.create(function()
        while true do
            local start_pos = juice.vec2.new(entity.transform.position.x, entity.transform.position.y)
            juice.routine.wait_seconds_func(hop_duration, function(x)
                entity.transform.position = juice.vec3.new(
                start_pos.x + hop_distance * x,
                start_pos.y + hop_height * math.sin(x * math.pi), 0
            )
            end)
            juice.routine.wait_seconds(math.random() * hop_wait_max - hop_wait_min)
        end
    end)
end

-- function update(delta_time)
--     time = time + delta_time

--     entity.physics.velocity = juice.vec2.new(0.5, 0)
-- end