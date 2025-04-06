juice.routine = {}
juice.routine.threads = {}

juice.routine.wait_frame = function()
    coroutine.yield()
end

juice.routine.wait_frames = function(frames)
    local frame_count = 1
    coroutine.yield(function()
        while frame_count < frames do
            frame_count = frame_count + 1
            coroutine.yield()
        end
    end)
end

juice.routine.wait_until_true = function(func)
    coroutine.yield(function()
        while not func() do
            coroutine.yield()
        end
    end)
end

juice.routine.wait_seconds = function(seconds)
    local time = 0.0
    coroutine.yield(function(delta_time)
        while time < seconds do
            time = time + delta_time
            delta_time = coroutine.yield()
        end
    end)
end

juice.routine.wait_seconds_func = function(seconds, func)
    local time = 0.0
    coroutine.yield(function(delta_time)
        while time < seconds do
            time = time + delta_time
            progress = time / seconds
            if progress > 1.0 then progress = 1.0 end
            func(progress)
            delta_time = coroutine.yield()
        end
    end)
end

juice.routine.create = function(routine_func)
    local new_routine = coroutine.create(routine_func)
    table.insert(juice.routine.threads, { routine = new_routine })
end

juice.routine.update_routines = function(delta_time)
    for idx, thread_info in ipairs(juice.routine.threads) do
        if thread_info.wait_routine ~= nil then
            local status = coroutine.resume(thread_info.wait_routine, delta_time)
            if coroutine.status(thread_info.wait_routine) == "dead" then
                thread_info.wait_routine = nil
            end
        else
            local status, wait_func = coroutine.resume(thread_info.routine)
            if coroutine.status(thread_info.routine) == "dead" then
                table.remove(juice.routine.threads, idx)
            else
                if wait_func ~= nil then
                    thread_info.wait_routine = coroutine.create(wait_func)
                end
            end
        end
    end
end