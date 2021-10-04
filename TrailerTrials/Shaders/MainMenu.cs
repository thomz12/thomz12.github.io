using JuiceboxEngine;
using JuiceboxEngine.Playfab;
using JuiceboxEngine.Resources;
using JuiceboxEngine.Util;
using System;
using System.Collections.Generic;
using System.Text;

namespace LD49.GameResources.Shaders
{
    class MainMenu : Scene
    {
        public MainMenu(ResourceManager manager) 
            : base(manager)
        {
        }

        private string _loginID;
        private TextComponent _nameText;

        protected override void InitializeScene()
        {
            Login();
        }

        protected override void PreUpdate()
        {
            
        }

        protected override void LateUpdate()
        {
            
        }

        protected override void FinalizeScene()
        {
            
        }

        private void Login()
        {
            _loginID = LocalStorage.GetValue("login_id").As<string>();

            if (_loginID == null)
            {
                _loginID = Guid.NewGuid().ToString();

                Console.WriteLine("Registering with Playfab...");
                _nameText.DisplayText = "Registering...";
                PlayfabManager.Identity.LoginWithCustomID(_loginID, true);
            }
            else
            {
                Console.WriteLine("Logging in with Playfab...");
                PlayfabManager.Identity.LoginWithCustomID(_loginID, false);
            }
            PlayfabManager.Identity.LoginTask.OnTaskCompleted += LoginFinished;
        }

        private void LoginFinished(PlayfabTask task)
        {
            if (task.Success)
            {
                LocalStorage.StoreValue("login_id", _loginID);
                _nameText.DisplayText = "Welcome!";
                Console.WriteLine($"Logged in with Playfab! {PlayfabManager.Identity.Username}");

                PlayfabManager.Identity.GetDisplayNameTask.OnTaskCompleted += (nameTask) =>
                {
                    if (PlayfabManager.Identity.Username != null)
                        _nameText.DisplayText = $"Welcome, {PlayfabManager.Identity.Username}";
                };
            }
            else
            {
                Console.WriteLine("Failed to log in with Playfab.");
            }
        }
    }
}
