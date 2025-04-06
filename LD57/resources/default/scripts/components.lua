-- All default components and order of them.
juice.editor.components = {
    { name = "transform", category = "", icon = "" },
    { name = "scripts", category = "hidden", icon = "" },
    { name = "sprite", category = "rendering", icon = "" },
    { name = "tilemap", category = "rendering", icon = "" },
    { name = "layer", category = "rendering", icon = ""  },
    { name = "camera", category = "rendering", icon = ""  },
    { name = "physics", category = "physics", icon = ""  },
    { name = "physics_box", category = "physics", icon = ""  },
    { name = "physics_circle", category = "physics", icon = ""  },
    { name = "distance_joint", category = "physics", icon = ""  },
    { name = "revolute_joint", category = "physics", icon = ""  },
    { name = "prismatic_joint", category = "physics", icon = ""  },
    { name = "line", category = "effects", icon = ""  },
    { name = "trail", category = "effects", icon = ""  },
    { name = "particles", category = "effects", icon = ""  },
    { name = "audio", category = "", icon = ""  },
    { name = "ui_root", category = "ui", icon = ""  },
    { name = "ui_element", category = "ui", icon = ""  },
    { name = "ui_panel", category = "ui", icon = ""  },
    { name = "ui_image", category = "ui", icon = ""  },
    { name = "ui_9_slice", category = "ui", icon = ""  },
    { name = "ui_text", category = "ui", icon = ""  },
}

---Helper function for showing primitive types.
---Will show the variable name as label.
---@param name string name of the variable.
---@param component any the component to get and set the variable at.
function juice.editor.ui.primitive(name, component)
    component[name] = juice.editor.ui[type(component[name])](name, component[name])
end

---Show an array in the editor.
---@param label string name of the array.
---@param container any container to show.
---@param element_func fun(index:integer, element:any) function called with index and element to visualize element.
---@param add_func nil|fun():any function called when element needs to be added. Should return a new element.
function juice.editor.ui.array(label, container, element_func, add_func)
    --Show label and 'add' & 'clear' button.
    local array_open = juice.editor.ui.tree_node(string.format("%s (array of size: %i) ### %s", label, container:size(), label))
    if add_func ~= nil then
        juice.editor.ui.same_line()
        if juice.editor.ui.small_button("") then
            container:add(add_func())
        end
        juice.editor.ui.tooltip("Add new element.")
    end
    juice.editor.ui.same_line()
    if juice.editor.ui.small_button("") then
        container:clear()
    end
    juice.editor.ui.tooltip("Clear array.")

    if array_open then
        local to_erase = 0
        -- Show all elements.
        for i, value in ipairs(container) do
            local element_open = juice.editor.ui.tree_node(string.format("%s[%i]",label, i))
            
            juice.editor.ui.same_line()
            if juice.editor.ui.small_button(string.format("###copy %i", i)) then
                container:insert(i, value)
            end
            juice.editor.ui.tooltip("Copy element.")

            if i > 1 then
                juice.editor.ui.same_line()
                if juice.editor.ui.small_button(string.format("###move up %i", i)) then
                    container:insert(i - 1, value)
                    container:erase(i + 1)
                end
                juice.editor.ui.tooltip("Move element up.")
            end
            if i < container:size() then
                juice.editor.ui.same_line()
                if juice.editor.ui.small_button(string.format("###move down %i", i)) then
                    container:insert(i + 2, value)
                    container:erase(i)
                end
                juice.editor.ui.tooltip("Move element down.")
            end

            juice.editor.ui.same_line()
            if juice.editor.ui.small_button(string.format("###erase %i", i)) then
                container:erase(to_erase)
            end
            juice.editor.ui.tooltip("Remove element.")

            if element_open then
                element_func(i, value)
                juice.editor.ui.tree_pop()
            end
        end
        juice.editor.ui.tree_pop()
    end
end

local interpolate_enum_names = {
    "Linear",
    "EaseInSine",
    "EaseOutSine",
    "EaseInOutSine",
    "EaseInQuad",
    "EaseOutQuad",
    "EaseInOutQuad",
    "EaseInCubic",
    "EaseOutCubic",
    "EaseInOutCubic",
    "EaseInQuart",
    "EaseOutQuart",
    "EaseInOutQuart",
    "EaseInQuint",
    "EaseOutQuint",
    "EaseInOutQuint",
    "EaseInExpo",
    "EaseOutExpo",
    "EaseInOutExpo",
    "EaseInCirc",
    "EaseOutCirc",
    "EaseInOutCirc",
    "EaseInBack",
    "EaseOutBack",
    "EaseInOutBack",
    "EaseInElastic",
    "EaseOutElastic",
    "EaseInOutElastic",
    "EaseInBounce",
    "EaseOutBounce",
    "EaseInOutBounce",
}

juice.editor.component_ui.transform = function(entity)
    juice.editor.ui.vec3("position", entity.transform.position)
    juice.editor.ui.tooltip("Position of the entity.")
    entity.transform.rotation = juice.editor.ui.number("rotation", entity.transform.rotation)
    juice.editor.ui.tooltip("Rotation of the entity.")
    juice.editor.ui.vec2("scale", entity.transform.scale)
    juice.editor.ui.tooltip("Scale of the entity.")
end

juice.editor.component_ui.scripts = function(entity)
    for i, script_instance in ipairs(entity.scripts.scripts) do
        local file_name = string.match(script_instance.script.path, "[^/]*.lua$")
        file_name = file_name:sub(0, #file_name - 4)

        local env = entity.scripts[file_name]
        if env ~= nil then
            local open, keep = juice.editor.ui.header(" " .. file_name .. " (script)")
            --Show globals from script.
            if open then
                for key, value in pairs(env) do
                    local var_type = type(value)
                    if var_type == "boolean" then
                        env[key] = juice.editor.ui.boolean(key, env[key])
                    elseif var_type == "number" then
                        env[key] = juice.editor.ui.number(key, env[key])
                    elseif var_type == "string" then
                        env[key] = juice.editor.ui.string(key, env[key])
                    elseif var_type == "userdata" then
                        local user_type = getmetatable(value).__type.name
                        if user_type == "Juicebox::Vector2" then
                            juice.editor.ui.vec2(key, value)
                        elseif user_type == "Juicebox::Vector3" then
                            juice.editor.ui.vec3(key, value)
                        elseif user_type == "Juicebox::Vector4" then
                            juice.editor.ui.vec4(key, value)
                        elseif user_type == "Juicebox::Color" then
                            juice.editor.ui.color(key, value)
                        elseif user_type == "Juicebox::RenderTarget" then
                            if juice.editor.ui.tree_node(key .. " (Rendertarget)") then
                                juice.editor.ui.show_texture(value:get_texture(), false)
                                juice.editor.ui.tree_pop()
                            end
                        end
                    end
                end
            end
            --Remove script.
            if not keep then
                entity.scripts.scripts:erase(i)
                if #entity.scripts.scripts == 0 then
                    entity:remove_component("scripts")
                end
            end
        end
    end
end

juice.editor.component_ui.sprite = function(entity)
    juice.editor.ui.texture("texture", entity.sprite.texture)
    juice.editor.ui.tooltip("Texture used for the sprite.")
    juice.editor.ui.color("color", entity.sprite.color)
    juice.editor.ui.tooltip("Tint color off the sprite.")
    juice.editor.ui.vec2("offset", entity.sprite.offset)
    juice.editor.ui.tooltip("Offset from the entity transform.")
    juice.editor.ui.primitive("pixel_perfect", entity.sprite)
    juice.editor.ui.tooltip("Round positions to whole numbers when rendering.")

    juice.editor.ui.separator("Source Rectangle")
    juice.editor.ui.vec2("dimensions", entity.sprite.dimensions)
    juice.editor.ui.tooltip("Source rectangle dimensions in pixels. 0 in a dimension will use the texture dimension.")
    juice.editor.ui.vec2("origin", entity.sprite.origin)
    juice.editor.ui.tooltip("Source rectangle origin. Bottom left coordinate in pixels.")
end

juice.editor.component_ui.layer = function(entity)
    entity.layer.layer = juice.editor.ui.enum_flags("layer", entity.layer.layer, { "FarBackground", "Background", "Default", "Foreground", "NearForeground" })
    juice.editor.ui.tooltip([[When to render the entity. Foregrounds will render of backgrounds.
0 = FarBackground
1 = Background
2 = Default
3 = Foreground
4 = NearForeground]])
end

juice.editor.component_ui.camera = function(entity)
    entity.camera.clear = juice.editor.ui.boolean("clear", entity.camera.clear)
    juice.editor.ui.tooltip("Enable clearing of the backbuffer.")
    if entity.camera.clear then
        juice.editor.ui.color("clear_color", entity.camera.clear_color)
        juice.editor.ui.tooltip("Color to clear the back-buffer to.")
    end
    entity.camera.zoom = juice.editor.ui.number("zoom", entity.camera.zoom)
    juice.editor.ui.tooltip("Zoom level of the camera.")
    entity.camera.main = juice.editor.ui.boolean("main", entity.camera.main)
    juice.editor.ui.tooltip("The main camera will be rendered to the back buffer.")
    entity.camera.render = juice.editor.ui.boolean("render", entity.camera.render)
    juice.editor.ui.tooltip("True to render this frame, false to skip rendering.")
    entity.camera.layers = juice.editor.ui.enum_flags("layers", entity.camera.layers, { "FarBackground", "Background", "Default", "Foreground", "NearForeground" })
    juice.editor.ui.tooltip("Layers to render with this camera.")

    juice.editor.ui.separator("Clipping")
    entity.camera.near_plane = juice.editor.ui.number("near_plane", entity.camera.near_plane)
    juice.editor.ui.tooltip("Near clipping plane.")
    entity.camera.far_plane = juice.editor.ui.number("far_plane", entity.camera.far_plane)
    juice.editor.ui.tooltip("Far clipping plane.")

    juice.editor.ui.separator("Backbuffer")
    entity.camera.width = juice.editor.ui.integer("width", entity.camera.width)
    juice.editor.ui.tooltip("Width of the backbuffer.")
    entity.camera.height = juice.editor.ui.integer("height", entity.camera.height)
    juice.editor.ui.tooltip("Height of the backbuffer.")
    entity.camera.use_depth_stencil = juice.editor.ui.boolean("use_depth_stencil", entity.camera.use_depth_stencil)
    juice.editor.ui.tooltip("Use depth/stencil buffer.")

    --Show the camera render target when tree is opened.
    juice.editor.ui.show_texture(entity.camera:get_render_target():get_texture(), false)
    if juice.editor.ui.tree_node("show depth") then
        juice.editor.ui.show_texture(entity.camera:get_render_target():get_depth_texture(), false)
        juice.editor.ui.tree_pop()
    end
end

function juice.editor.component_ui.physics(entity)
    entity.physics.body_type = juice.editor.ui.enum("body_type", entity.physics.body_type, { " Static", " Kinematic", " Dynamic" })
    juice.editor.ui.tooltip([[Body type of this body.
0 = Static, won't ever move.
1 = Kinematic, won't react but can have a velocity.
2 = Dynamic, fully simulated physics body. ]])

    entity.physics.gravity_scale = juice.editor.ui.number("gravity_scale", entity.physics.gravity_scale)
    juice.editor.ui.tooltip("How much this body reacts to gravity.")
    entity.physics.fix_rotation = juice.editor.ui.boolean("fix_rotation", entity.physics.fix_rotation)
    juice.editor.ui.tooltip("When rotation is fixed, the body won't be able to rotate.")

    entity.physics.allow_sleep = juice.editor.ui.boolean("allow_sleep", entity.physics.allow_sleep)
    juice.editor.ui.tooltip("Puts the body to sleep if when not moving. Will wake automatically.")
    entity.physics.projectile = juice.editor.ui.boolean("projectile", entity.physics.projectile)
    juice.editor.ui.tooltip("Projectiles will take more sub-steps. Use for small, fast objects.")

    juice.editor.ui.separator("Damping")
    entity.physics.linear_damping = juice.editor.ui.number("linear_damping", entity.physics.linear_damping)
    juice.editor.ui.tooltip("How much the velocity decreases over time.")
    entity.physics.angular_damping = juice.editor.ui.number("angular_damping", entity.physics.angular_damping)
    juice.editor.ui.tooltip("How much the rotational velocity decreases over time.")
end

local function show_collider(collider)
    collider.density = juice.editor.ui.number("density", collider.density)
    juice.editor.ui.tooltip("Density of the collider.")
    collider.is_sensor = juice.editor.ui.boolean("is_sensor", collider.is_sensor)
    juice.editor.ui.tooltip("Sensors only report collision responses.")

    juice.editor.ui.separator("Collision response")
    collider.friction = juice.editor.ui.number("friction", collider.friction)
    juice.editor.ui.tooltip("How much friction this shape has.")
    collider.restitution = juice.editor.ui.number("restitution", collider.restitution)
    juice.editor.ui.tooltip("Restitution or bounciness of the shape.")

    local layers = {}
    for i = 1, 16 do
        table.insert(layers, "Layer " .. i)
    end

    juice.editor.ui.separator("Layers")
    collider.category_bits = juice.editor.ui.enum_flags("category_bits", collider.category_bits, layers)
    juice.editor.ui.tooltip("What categories this shape belongs to.")
    collider.category_mask = juice.editor.ui.enum_flags("category_mask", collider.category_mask, layers)
    juice.editor.ui.tooltip("What categories this shape collides with.")
end

local function show_joint(joint)
    joint.collide_connected = juice.editor.ui.boolean("collide_connected", joint.collide_connected)
    juice.editor.ui.tooltip("Allow collision with the connected body.")
    joint.connected_body = juice.editor.ui.entity("connected_body", joint.connected_body)
    juice.editor.ui.tooltip("The body this joint is connected to.")
end

function juice.editor.component_ui.physics_box(entity)
    juice.editor.ui.vec2("size", entity.physics_box.size)
    juice.editor.ui.tooltip("Size of the box.")
    show_collider(entity.physics_box)
end

function juice.editor.component_ui.physics_circle(entity)
    entity.physics_circle.radius = juice.editor.ui.number("radius", entity.physics_circle.radius)
    juice.editor.ui.tooltip("Radius of the circle.")
    show_collider(entity.physics_circle)
end

function juice.editor.component_ui.distance_joint(entity)
    entity.distance_joint.custom_lengths = juice.editor.ui.boolean("custom_lengths", entity.distance_joint.custom_lengths)
    entity.distance_joint.rest_length = juice.editor.ui.number("rest_length", entity.distance_joint.rest_length)
    entity.distance_joint.min_length = juice.editor.ui.number("min_length", entity.distance_joint.min_length)
    entity.distance_joint.max_length = juice.editor.ui.number("max_length", entity.distance_joint.max_length)
    entity.distance_joint.frequency = juice.editor.ui.number("frequency", entity.distance_joint.frequency)
    entity.distance_joint.damping = juice.editor.ui.number("damping", entity.distance_joint.damping)
    entity.distance_joint.current_length = juice.editor.ui.number("current_length", entity.distance_joint.current_length)
    
    show_joint(entity.distance_joint)
end

function juice.editor.component_ui.revolute_joint(entity)
    entity.revolute_joint.limit_angle = juice.editor.ui.boolean("limit_angle", entity.revolute_joint.limit_angle)
    if entity.revolute_joint.limit_angle then
        entity.revolute_joint.lower_angle = juice.editor.ui.number("lower_angle", entity.revolute_joint.lower_angle)
        entity.revolute_joint.upper_angle = juice.editor.ui.number("upper_angle", entity.revolute_joint.upper_angle)
    end
    entity.revolute_joint.motor_enable = juice.editor.ui.boolean("motor_enable", entity.revolute_joint.motor_enable)
    if entity.revolute_joint.motor_enable then
        entity.revolute_joint.motor_speed = juice.editor.ui.number("motor_speed", entity.revolute_joint.motor_speed)
        entity.revolute_joint.motor_max_torque = juice.editor.ui.number("motor_max_torque", entity.revolute_joint.motor_max_torque)
    end
    entity.revolute_joint.current_angle = juice.editor.ui.number("current_angle", entity.revolute_joint.current_angle)

    show_joint(entity.revolute_joint)
end

function juice.editor.component_ui.prismatic_joint(entity)
    entity.prismatic_joint.limit_translation = juice.editor.ui.boolean("limit_translation", entity.prismatic_joint.limit_translation)
    if entity.prismatic_joint.limit_translation then
        entity.prismatic_joint.lower_limit = juice.editor.ui.number("lower_limit", entity.prismatic_joint.lower_limit)
        entity.prismatic_joint.upper_limit = juice.editor.ui.number("upper_limit", entity.prismatic_joint.upper_limit)
    end
    entity.prismatic_joint.motor_enable = juice.editor.ui.boolean("motor_enable", entity.prismatic_joint.motor_enable)
    if entity.prismatic_joint.limit_translation then
        entity.prismatic_joint.motor_speed = juice.editor.ui.number("motor_speed", entity.prismatic_joint.motor_speed)
        entity.prismatic_joint.motor_max_force = juice.editor.ui.number("motor_max_force", entity.prismatic_joint.motor_max_force)
    end
    show_joint(entity.prismatic_joint)
end

function juice.editor.component_ui.line(entity)
    juice.editor.ui.primitive("local", entity.line)
    entity.line.connect_style = juice.editor.ui.enum("connect_style", entity.line.connect_style, { "None" , "Simple" })

    juice.editor.ui.array("points", entity.line.points, 
        function(index, element)
            juice.editor.ui.primitive("width", element)
            juice.editor.ui.vec2("position", element.position)
            juice.editor.ui.color("color", element.color)
        end,
        function()
            return juice.line_element.new()
        end)

    juice.editor.ui.separator("Texture")
    juice.editor.ui.texture("texture", entity.line.texture)
    entity.line.texture_style = juice.editor.ui.enum("texture_style", entity.line.texture_style, { "Stretch" , "Normal" })
end

function juice.editor.component_ui.trail(entity)
    juice.editor.ui.color("start_color", entity.trail.start_color)
    juice.editor.ui.primitive("time_decay", entity.trail)
    juice.editor.ui.primitive("start_width", entity.trail)
    juice.editor.ui.primitive("min_move_distance", entity.trail)
end

function juice.editor.component_ui.tilemap(entity)
    juice.editor.ui.texture("tile_texture", entity.tilemap.tile_texture)
    entity.tilemap.map_width = juice.editor.ui.integer("map_width", entity.tilemap.map_width)
    entity.tilemap.map_height = juice.editor.ui.integer("map_height", entity.tilemap.map_height)
    entity.tilemap.tile_width = juice.editor.ui.integer("tile_width", entity.tilemap.tile_width)
    entity.tilemap.tile_height = juice.editor.ui.integer("tile_height", entity.tilemap.tile_height)
    juice.editor.ui.vec2("tile_size", entity.tilemap.tile_size)
end

function juice.editor.component_ui.particles(entity)
    juice.editor.ui.primitive("continuous", entity.particles)
    juice.editor.ui.texture("texture", entity.particles.texture)
    juice.editor.ui.primitive("emission_rate", entity.particles)
    juice.editor.ui.primitive("min_life_time", entity.particles)
    juice.editor.ui.primitive("max_life_time", entity.particles)
    juice.editor.ui.vec2("start_velocity", entity.particles.start_velocity)
    juice.editor.ui.vec2("gravity", entity.particles.gravity)
    juice.editor.ui.primitive("emission_angle", entity.particles)
    juice.editor.ui.vec2("start_scale", entity.particles.start_scale)
    juice.editor.ui.vec2("end_scale", entity.particles.end_scale)
    entity.particles.scale_func = juice.editor.ui.enum("scale_func", entity.particles.scale_func, interpolate_enum_names)
    juice.editor.ui.color("start_color", entity.particles.start_color)
    juice.editor.ui.color("end_color", entity.particles.end_color)
    entity.particles.color_func = juice.editor.ui.enum("color_func", entity.particles.color_func, interpolate_enum_names)
    juice.editor.ui.primitive("world_space", entity.particles)
end

function juice.editor.component_ui.audio(entity)
    juice.editor.ui.audio("audio_clip", entity.audio.audio_clip)
    juice.editor.ui.primitive("auto_play", entity.audio)
    juice.editor.ui.primitive("looping", entity.audio)
    juice.editor.ui.primitive("volume", entity.audio)
    juice.editor.ui.primitive("pitch", entity.audio)
end

function juice.editor.component_ui.ui_root(entity)
    juice.editor.ui.primitive("scale", entity.ui_root)
end

function juice.editor.component_ui.ui_element(entity)
    juice.editor.ui.primitive("enabled", entity.ui_element)
    juice.editor.ui.vec2("dimensions", entity.ui_element.dimensions)
    juice.editor.ui.vec2("parent_scale", entity.ui_element.parent_scale)
    juice.editor.ui.vec2("offset", entity.ui_element.offset)
    juice.editor.ui.vec2("pivot", entity.ui_element.pivot)
    juice.editor.ui.vec2("anchor", entity.ui_element.anchor)
    entity.ui_element.input_type = juice.editor.ui.enum("input_type", entity.ui_element.input_type, {
        "None",
        "Children",
        "Self",
        "All"
    })
end

function juice.editor.component_ui.ui_panel(entity)
    juice.editor.ui.color("color", entity.ui_panel.color)
end

function juice.editor.component_ui.ui_image(entity)
    juice.editor.ui.texture("image", entity.ui_image.image)
    juice.editor.ui.color("color", entity.ui_image.color)
    juice.editor.ui.primitive("flip_x", entity.ui_image)
    juice.editor.ui.primitive("flip_y", entity.ui_image)
end

function juice.editor.component_ui.ui_9_slice(entity)
    juice.editor.ui.texture("image", entity.ui_9_slice.image)
    juice.editor.ui.primitive("border", entity.ui_9_slice)
    juice.editor.ui.color("color", entity.ui_9_slice.color)
end

function juice.editor.component_ui.ui_text(entity)
    juice.editor.ui.primitive("text", entity.ui_text)
    juice.editor.ui.font("font", entity.ui_text.font)
    entity.ui_text.vertical = juice.editor.ui.enum("vertical", entity.ui_text.vertical, { "Top", "Center", "Bottom" })
    entity.ui_text.horizontal = juice.editor.ui.enum("horizontal", entity.ui_text.horizontal, { "Left", "Center", "Right" })
    juice.editor.ui.color("color", entity.ui_text.color)
    juice.editor.ui.primitive("font_size", entity.ui_text)
    juice.editor.ui.primitive("wrap_text", entity.ui_text)
end