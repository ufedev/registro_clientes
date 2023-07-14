<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit81f1202bc6375afff6d2da281b461af9
{
    public static $files = array (
        '8666530795a349866a5c08062b82b8ef' => __DIR__ . '/..' . '/ufedev/uff/src/snippets.php',
    );

    public static $prefixLengthsPsr4 = array (
        'U' => 
        array (
            'Uff\\' => 4,
        ),
        'M' => 
        array (
            'Models\\' => 7,
        ),
        'C' => 
        array (
            'Controllers\\' => 12,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Uff\\' => 
        array (
            0 => __DIR__ . '/..' . '/ufedev/uff/src/uff',
        ),
        'Models\\' => 
        array (
            0 => __DIR__ . '/../..' . '/models',
        ),
        'Controllers\\' => 
        array (
            0 => __DIR__ . '/../..' . '/controllers',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit81f1202bc6375afff6d2da281b461af9::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit81f1202bc6375afff6d2da281b461af9::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit81f1202bc6375afff6d2da281b461af9::$classMap;

        }, null, ClassLoader::class);
    }
}