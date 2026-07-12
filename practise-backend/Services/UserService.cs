
using practise_backend.Repository;

namespace practise_backend.Services
{
    public class UserService : IUserService
    {

        private readonly IUserRepository userRepository;

        public UserService(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }

        // ищет пользователя по нику. ЕСли есть, то кидаем его наверх. ЕСли нет. то возвращаем нулл.
        // в контроллере проверяем: если нулл, то возвращаем BadRequest
        // иначе возвращаем Ok
        public async Task<User?> AuthenticateAsync(string nickname, string password)
        {
            var user = await userRepository.GetByNicknameAsync(nickname);

            if (user != null && string.Equals(user.Password, password))
                return user;
            else
                return null;
        }

        public async Task<User?> GetByIdAsync(int id)
        {
            return await userRepository.GetByIdAsync(id);
        }

        // добавляет пользователя в бд. Перед этим мб проверить, что:
        // пользователя с таким ником нет
        // пользователя с такой почтой нет
        // public async Task<RegisterRequestDto> RegisterAsync(RegisterRequestDto userDto)
        // {
        //     var u = await userRepository.GetByNicknameAsync(userDto.Nickname);

        //     if (u != null)
        //         throw new Exception("Пользователь с таким ником уже есть");

        //     await userRepository.AddAsync(MapToUser(userDto));
        //     await userRepository.SaveChangesAsync();

        //     return userDto;
        // }

        public User MapToUser(RegisterRequestDto dto)
        {
            if (dto == null)
            {
                throw new ArgumentNullException(nameof(dto), "Данные регистрации не могут быть пустыми");
            }

            return new User
            {
                Nickname = dto.Nickname,
                Email = dto.Email,
                Password = dto.Password,
                Lastname = dto.Lastname,
                FirstName = dto.FirstName,
                Photo = dto.Photo,
                Contacts = dto.Contacts,
                About = dto.About,
                Achievements = dto.Achievements
            };
        }

        public async Task<User> RegisterAsync(RegisterRequestDto dto) 
        {
            var u = await userRepository.GetByNicknameAsync(dto.Nickname);

            if (u != null)
                throw new Exception("Пользователь с таким ником уже есть");

            u = await userRepository.GetByEmailAsync(dto.Email);

            if (u != null)
                throw new Exception("Пользователь с такой почтой уже зарегистрирован");
            

            var user = MapToUser(dto);

            await userRepository.AddAsync(user);
            await userRepository.SaveChangesAsync();

            return user;
        }
    }
}