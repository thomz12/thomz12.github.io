local gizmo_alpha = 0.5

function juice.editor.gizmo.transform(entity, gizmo)
    
    local pos = entity.transform.world_position
    local mouse_pos = gizmo:get_mouse_position()

    -- Calculate offsets before any moves so they stay nicely aligned.
    local x_offset = juice.vec2.new(32, 0):rotate(entity.transform.world_rotation)
    local y_offset = juice.vec2.new(0, 32):rotate(entity.transform.world_rotation)
    local rot_gizmo_pos = juice.vec2.new(-16, -16)
    local rot_offset = juice.vec2.new(rot_gizmo_pos.x, rot_gizmo_pos.y):rotate(entity.transform.world_rotation)

    -- Free move the object.
    if gizmo:draggable("", juice.vec2.new(pos.x, pos.y), juice.color.new(1, 1, 0, gizmo_alpha), -entity.transform.world_rotation) then
        entity.transform.world_position = juice.vec3.new(mouse_pos, pos.z)
    end

    -- Move object along local x-axis.
    local x_move_pos = juice.vec2.new(pos.x + x_offset.x, pos.y + x_offset.y)
    if gizmo:draggable("", x_move_pos, juice.color.new(1, 0, 0, gizmo_alpha), -entity.transform.world_rotation) then
        local direction = juice.vec2.new(mouse_pos.x - x_move_pos.x, mouse_pos.y - x_move_pos.y)
        direction:rotate(-entity.transform.world_rotation).y = 0
        direction:rotate(entity.transform.world_rotation)
        entity.transform.world_position = juice.vec3.new(pos.x + direction.x, pos.y + direction.y, pos.z)
    end

    -- Move object along local y-axis.
    local y_move_pos = juice.vec2.new(pos.x + y_offset.x, pos.y + y_offset.y)
    if gizmo:draggable("", y_move_pos, juice.color.new(0, 1, 0, gizmo_alpha), -entity.transform.world_rotation) then
        local direction = juice.vec2.new(mouse_pos.x - y_move_pos.x, mouse_pos.y - y_move_pos.y)
        direction:rotate(-entity.transform.world_rotation).x = 0
        direction:rotate(entity.transform.world_rotation)
        entity.transform.world_position = juice.vec3.new(pos.x + direction.x, pos.y + direction.y, pos.z)
    end

    local rot_pos = juice.vec2.new(pos.x + rot_offset.x, pos.y + rot_offset.y)
    if gizmo:draggable("", rot_pos, juice.color.new(1, 0, 1, gizmo_alpha), -entity.transform.world_rotation) then
        local direction = juice.vec2.new(mouse_pos.x - pos.x, mouse_pos.y - pos.y)
        local dot = rot_gizmo_pos:normalized():dot(direction:normalized())
        local angle = math.deg(math.acos(dot))
        if direction:rotate(-225).y > 0 then
            entity.transform.world_rotation = angle
        else
            entity.transform.world_rotation = -angle
        end
    end
end

function juice.editor.gizmo.camera(entity, gizmo)

    if entity.transform == nil then
        return
    end

    local pos = entity.transform.world_position
    local rot = entity.transform.world_rotation
    local gizmo_color = juice.color.new(0, 0, 0, gizmo_alpha)

    local scaling = 2 * entity.camera.zoom

    -- Calculate viewport corners.
    local top_left = juice.vec2.new(-entity.camera.width / scaling, entity.camera.height / scaling):rotate(rot)
    local top_right = juice.vec2.new(entity.camera.width / scaling , entity.camera.height / scaling):rotate(rot)
    local bottom_left = juice.vec2.new(-entity.camera.width / scaling, -entity.camera.height / scaling):rotate(rot)
    local bottom_right = juice.vec2.new(entity.camera.width / scaling, -entity.camera.height / scaling):rotate(rot)

    -- Draw rectangle lines.
    gizmo:draw_line(juice.vec2.new(pos.x + top_left.x, pos.y + top_left.y), juice.vec2.new(pos.x + top_right.x, pos.y + top_right.y), gizmo_color, 1)
    gizmo:draw_line(juice.vec2.new(pos.x + top_right.x, pos.y + top_right.y), juice.vec2.new(pos.x + bottom_right.x, pos.y + bottom_right.y), gizmo_color, 1)
    gizmo:draw_line(juice.vec2.new(pos.x + bottom_right.x, pos.y + bottom_right.y), juice.vec2.new(pos.x + bottom_left.x, pos.y + bottom_left.y), gizmo_color, 1)
    gizmo:draw_line(juice.vec2.new(pos.x + bottom_left.x, pos.y + bottom_left.y), juice.vec2.new(pos.x + top_left.x, pos.y + top_left.y), gizmo_color, 1)
end

function juice.editor.gizmo.physics_circle(entity, gizmo)

    if entity.transform == nil then
        return
    end

    local pos = entity.transform.world_position
    local mouse_pos = gizmo:get_mouse_position()

    gizmo:draw_circle(juice.vec2.new(pos), entity.physics_circle.radius, juice.color.new(0, 0, 1, 1), 1, false)
    
    if gizmo:draggable("", juice.vec2.new(pos.x + entity.physics_circle.radius, pos.y), juice.color.new(0, 0, 1, gizmo_alpha), 0) then
        entity.physics_circle.radius = juice.vec2.new(mouse_pos.x - pos.x, mouse_pos.y - pos.y):length()
    end
end

function juice.editor.gizmo.physics_box(entity, gizmo)

    if entity.transform == nil then
        return
    end

    local pos = entity.transform.world_position
    local rot = entity.transform.world_rotation
    local gizmo_color = juice.color.new(0, 0, 1, gizmo_alpha)

    -- Calculate rectangle corners.
    local top_left = juice.vec2.new(-entity.physics_box.size.x / 2, entity.physics_box.size.y / 2):rotate(rot)
    local top_right = juice.vec2.new(entity.physics_box.size.x / 2, entity.physics_box.size.y / 2):rotate(rot)
    local bottom_left = juice.vec2.new(-entity.physics_box.size.x / 2, -entity.physics_box.size.y / 2):rotate(rot)
    local bottom_right = juice.vec2.new(entity.physics_box.size.x / 2, -entity.physics_box.size.y / 2):rotate(rot)

    -- Calculate rectangle side centers.
    local top_pos = juice.vec2.new(pos.x + (top_left.x + top_right.x) / 2.0, pos.y + (top_left.y + top_right.y) / 2.0)
    local bottom_pos = juice.vec2.new(pos.x + (bottom_left.x + bottom_right.x) / 2.0, pos.y + (bottom_left.y + bottom_right.y) / 2.0)
    local left_pos = juice.vec2.new(pos.x + (top_left.x + bottom_left.x) / 2.0, pos.y + (top_left.y + bottom_left.y) / 2.0)
    local right_pos = juice.vec2.new(pos.x + (top_right.x + bottom_right.x) / 2.0, pos.y + (top_right.y + bottom_right.y) / 2.0)

    -- Draw rectangle lines.
    gizmo:draw_line(juice.vec2.new(pos.x + top_left.x, pos.y + top_left.y), juice.vec2.new(pos.x + top_right.x, pos.y + top_right.y), gizmo_color, 1)
    gizmo:draw_line(juice.vec2.new(pos.x + top_right.x, pos.y + top_right.y), juice.vec2.new(pos.x + bottom_right.x, pos.y + bottom_right.y), gizmo_color, 1)
    gizmo:draw_line(juice.vec2.new(pos.x + bottom_right.x, pos.y + bottom_right.y), juice.vec2.new(pos.x + bottom_left.x, pos.y + bottom_left.y), gizmo_color, 1)
    gizmo:draw_line(juice.vec2.new(pos.x + bottom_left.x, pos.y + bottom_left.y), juice.vec2.new(pos.x + top_left.x, pos.y + top_left.y), gizmo_color, 1)

    local mouse_pos = gizmo:get_mouse_position()
    local direction = juice.vec2.new(pos.x - mouse_pos.x, pos.y - mouse_pos.y)

    if gizmo:draggable("##top", top_pos, gizmo_color, -rot) then
        entity.physics_box.size.y = math.abs(direction:rotate(rot).y * 2)
    end

    if gizmo:draggable("##bottom", bottom_pos, gizmo_color, -rot) then
        entity.physics_box.size.y = math.abs(direction:rotate(rot).y * 2)
    end

    if gizmo:draggable("##left", left_pos, gizmo_color, -rot) then
        entity.physics_box.size.x = math.abs(direction:rotate(rot).x * 2)
    end

    if gizmo:draggable("##right", right_pos, gizmo_color, -rot) then
        entity.physics_box.size.x = math.abs(direction:rotate(rot).x * 2)
    end
end
