const UserCard = ({ addedUser }) => {
  return (
    <>
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <img
            src={
              addedUser.avatarImgURL ||
              (addedUser.profileImgURL &&
                `https://unimall-server.onrender.com/uploads/images/${addedUser.profileImgURL}`) ||
              "/assets/icons/profile-placeholder.svg"
            }
            alt="creator"
            className="rounded-full w-12 min-[1250px]:h-12 max-[350px]:w-14 max-[350px]:h-14 max-[600px]:w-12 max-[600px]:h-12 max-[700px]:w-14 max-[700px]:h-14 max-[800px]:w-12 max-[800px]:h-12 max-[950px]:w-14 max-[950px]:h-14 max-[1150px]:w-12 max-[1150px]:h-12 max-[1250px]:w-14 max-[1250px]:h-14"
          />

          <div className="flex flex-col">
            <p className="base-medium lg:body-bold text-light-1">{addedUser.AU_name}</p>
            <div className="flex items-center gap-2 text-light-3 max-[350px]:flex-col max-[350px]:gap-0 max-[350px]:items-start max-[600px]:flex-row max-[600px]:gap-2 max-[600px]:items-center max-[700px]:flex-col max-[700px]:gap-0 max-[700px]:items-start max-[800px]:flex-row max-[800px]:gap-2 max-[800px]:items-center max-[950px]:flex-col max-[950px]:gap-0 max-[950px]:items-start max-[1150px]:flex-row max-[1150px]:gap-2 max-[1150px]:items-center max-[1250px]:flex-col max-[1250px]:gap-0 max-[1250px]:items-start ">
              <p className="subtle-semibold lg:small-regular whitespace-nowrap text-ellipsis max-w-20">
                @{addedUser.AU_username}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
